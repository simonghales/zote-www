// @flow

import type { ComponentModel } from './model';
import type {
  BlockOrder,
  BlocksOrder,
} from '../../editor/components/ComponentSortable/ComponentSortable';
import { getBlocksFromComponent } from './state';
import type { BlockModel } from '../block/model';
import { updateBlockPropValue } from '../block/modifiers';
import { CHILDREN_PROP_CONFIG } from '../block/props/data';

export function updateBlockOrder(
  block: BlockModel,
  blockOrder: BlockOrder,
  rootBlocksKeysOrder: Array<string>
): BlockModel {
  const blockChildrenKeys =
    block.isRootBlock && !blockOrder ? rootBlocksKeysOrder : blockOrder.children;
  return updateBlockPropValue(block, CHILDREN_PROP_CONFIG.key, blockChildrenKeys);
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
