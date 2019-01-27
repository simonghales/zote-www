// @flow

import { cx } from 'emotion';
import type { ComponentModel } from '../../../data/component/model';
import type { SortableBlockModel } from './models';
import {
  getBlocksFromComponent,
  getRootBlockKeyFromComponent,
} from '../../../data/component/state';
import {
  doesBlockAllowChildBlocks,
  getBlockChildrenKeysFromBlock,
  getBlockFromBlocks,
} from '../../../data/block/state';
import type { BlocksModel } from '../../../data/block/model';
import { nestListClassNames } from './components/NestList/styles';

export function mapComponentBlockToSortableBlock(
  blockKey: string,
  blocks: BlocksModel,
  selectedBlockKey: string
): SortableBlockModel {
  const block = getBlockFromBlocks(blockKey, blocks);
  const blockChildrenKeys = getBlockChildrenKeysFromBlock(block);
  const selected = blockKey === selectedBlockKey;
  return {
    id: blockKey,
    blockKey,
    children: blockChildrenKeys.map(blockChildKey =>
      mapComponentBlockToSortableBlock(blockChildKey, blocks, selectedBlockKey)
    ),
    childrenEnabled: doesBlockAllowChildBlocks(block),
    classes: cx({
      [nestListClassNames.nestItemSelected]: selected,
    }),
    selected,
  };
}

export function mapComponentBlocksToSortableBlocks(
  component: ComponentModel,
  selectedBlockKey: string
): Array<SortableBlockModel> {
  const blocks = getBlocksFromComponent(component);
  const rootBlockKey = getRootBlockKeyFromComponent(component);
  const rootBlock = getBlockFromBlocks(rootBlockKey, blocks);
  const rootBlockChildrenKeys = getBlockChildrenKeysFromBlock(rootBlock);
  return rootBlockChildrenKeys.map(blockKey =>
    mapComponentBlockToSortableBlock(blockKey, blocks, selectedBlockKey)
  );
}
