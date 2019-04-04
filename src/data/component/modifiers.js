// @flow

import type { ComponentModel } from './model';
import type {
  BlockOrder,
  BlocksOrder,
} from '../../editor/components/ComponentSortable/ComponentSortable';
import { getBlocksFromComponent, getRootBlockKeyFromComponent } from './state';
import type { BlockModel, BlocksModel } from '../block/model';
import {
  addBlocksToBlockChildren,
  addBlockToBlockChildrenKeys,
  removeBlockFromBlockChildren,
  updateBlockName,
  updateBlockPropValue,
} from '../block/modifiers';
import { CHILDREN_PROP_CONFIG } from '../block/props/data';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import {
  getBlockChildrenKeysFromBlock,
  getBlockDescendantKeysFromBlock,
  getBlockFromBlocks,
  getBlockIndexInParentChildren,
  getBlockName,
  getBlockParentBlockKeyFromBlocks,
} from '../block/state';
import ComponentBlock from '../block/types/groups/component/Component';
import { generateComponentKey } from '../block/keys';

export function updateBlockChildrenKeys(
  block: BlockModel,
  blockChildrenKeys: Array<string>
): BlockModel {
  return updateBlockPropValue(block, CHILDREN_PROP_CONFIG.key, blockChildrenKeys);
}

export function updateBlockOrder(
  block: BlockModel,
  blockOrder: BlockOrder,
  rootBlocksKeysOrder: Array<string>
): BlockModel {
  const blockChildrenKeys =
    block.isRootBlock && !blockOrder ? rootBlocksKeysOrder : blockOrder.children;
  return updateBlockChildrenKeys(block, blockChildrenKeys);
}

export function updateComponentBlocksOrder(
  component: ComponentModel,
  blocksOrder: BlocksOrder,
  rootBlocksKeysOrder: Array<string>
): ComponentModel {
  const blocks = getBlocksFromComponent(component);
  const updatedBlocks = {};
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    updatedBlocks[block.key] = updateBlockOrder(block, blocksOrder[block.key], rootBlocksKeysOrder);
  });
  return {
    ...component,
    blocks: updatedBlocks,
  };
}

export function addBlockToComponent(
  component: ComponentModel,
  block: BlockModel,
  selectedBlockKey: string,
  selectedPosition: AddBlockPositions
): ComponentModel {
  const blocks = getBlocksFromComponent(component);
  const selectedBlock = blocks[selectedBlockKey];
  const rootBlockKey = getRootBlockKeyFromComponent(component);
  let targetIndex = 0;
  let targetBlock = selectedBlock;
  if (!selectedBlock) {
    targetBlock = blocks[rootBlockKey];
    selectedBlockKey = rootBlockKey;
    selectedPosition = ADD_BLOCK_POSITIONS.inside;
  }
  if (selectedPosition === ADD_BLOCK_POSITIONS.before) {
    let parentBlockKey = getBlockParentBlockKeyFromBlocks(selectedBlockKey, blocks);
    if (!parentBlockKey) {
      parentBlockKey = rootBlockKey;
    }
    targetBlock = getBlockFromBlocks(parentBlockKey, blocks);
    const selectedBlockIndex = getBlockIndexInParentChildren(selectedBlockKey, targetBlock);
    if (selectedBlockIndex > 0) {
      targetIndex = selectedBlockIndex;
    }
  }
  const targetBlockUpdatedChildrenKeys = addBlockToBlockChildrenKeys(
    block.key,
    getBlockChildrenKeysFromBlock(targetBlock),
    targetIndex
  );
  return {
    ...component,
    blocks: {
      ...blocks,
      [targetBlock.key]: updateBlockChildrenKeys(targetBlock, targetBlockUpdatedChildrenKeys),
      [block.key]: block,
    },
  };
}

export function removeBlockFromComponent(
  component: ComponentModel,
  blockToDeleteKey: string,
  deleteChildren: boolean
): ComponentModel {
  const blocks = getBlocksFromComponent(component);
  let blocksToDelete = [blockToDeleteKey];
  const block = getBlockFromBlocks(blockToDeleteKey, blocks);
  const descendantBlockKeys = getBlockDescendantKeysFromBlock(block, blocks);
  const parentBlockKey = getBlockParentBlockKeyFromBlocks(blockToDeleteKey, blocks);
  if (!parentBlockKey) {
    throw new Error(`No parent block key found.`);
  }
  let parentBlock = blocks[parentBlockKey];
  const blockIndex = getBlockIndexInParentChildren(blockToDeleteKey, parentBlock);
  parentBlock = removeBlockFromBlockChildren(parentBlock, blockToDeleteKey);
  if (deleteChildren) {
    if (!block) {
      throw new Error(`Block ${blockToDeleteKey} not found within blocks`);
    }
    blocksToDelete = blocksToDelete.concat(descendantBlockKeys);
  } else {
    parentBlock = addBlocksToBlockChildren(parentBlock, descendantBlockKeys, blockIndex);
  }
  const finalBlocks = {};
  Object.keys(blocks).forEach(blockKey => {
    if (!blocksToDelete.includes(blockKey)) {
      if (blockKey === parentBlockKey) {
        finalBlocks[blockKey] = parentBlock;
      } else {
        finalBlocks[blockKey] = blocks[blockKey];
      }
    }
  });
  return {
    ...component,
    blocks: {
      ...finalBlocks,
    },
  };
}

export function createNewComponent(
  initialBlocks: BlocksModel,
  rootBlockChildrenKeys: Array<string>
): ComponentModel {
  let rootBlock = ComponentBlock.generate();
  if (rootBlockChildrenKeys && rootBlockChildrenKeys.length > 0) {
    rootBlock = addBlocksToBlockChildren(rootBlock, rootBlockChildrenKeys, 0);
    const firstBlock = getBlockFromBlocks(rootBlockChildrenKeys[0], initialBlocks);
    rootBlock = updateBlockName(rootBlock, getBlockName(firstBlock));
  }
  return {
    key: generateComponentKey(),
    blocks: {
      ...initialBlocks,
      [rootBlock.key]: rootBlock,
    },
    rootBlockKey: rootBlock.key,
  };
}

export function createNewComponentFromComponentBlock(
  originalComponent: ComponentModel,
  blockKey: string
): ComponentModel {
  const originalBlocks = getBlocksFromComponent(originalComponent);
  const block = originalBlocks[blockKey];
  const blocksToAdd = {
    [blockKey]: block,
  };
  const blockDescendantKeys = getBlockDescendantKeysFromBlock(block, originalBlocks);
  blockDescendantKeys.forEach(blockChildKey => {
    blocksToAdd[blockChildKey] = originalBlocks[blockChildKey];
  });
  const component = createNewComponent(blocksToAdd, [blockKey]);
  return component;
}
