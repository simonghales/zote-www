// @flow
import type { Node } from 'react';
import type { MappedBlockModel, MappedBlockStylesModel } from './model';
import type { ComponentModel } from '../../../data/component/model';
import type { BlockModel, BlocksModel } from '../../../data/block/model';
import {
  getBlocksFromComponent,
  getRootBlockKeyFromComponent,
} from '../../../data/component/state';
import { getBlockFromBlocks, getStyleKeyFromBlock } from '../../../data/block/state';
import { parseMappedBlockPropsValues } from './props/state';
import type { BlockTypeModel } from '../../../data/block/types/model';
import { BLOCK_TYPES } from '../../../data/block/types/data';
import { getComponentFromBlockType } from '../../../data/block/types/state';
import { getMappedBlockStyles } from './styles/state';
import type { StylesModels } from '../../../data/styles/model';

export function getBlockTypeFromMappedBlock(mappedBlock: MappedBlockModel): BlockTypeModel {
  return BLOCK_TYPES[mappedBlock.blockTypeKey];
}

export function getMappedStylesFromMappedBlock(
  mappedBlock: MappedBlockModel
): MappedBlockStylesModel {
  const { styles = {} } = mappedBlock;
  return styles;
}

export function getComponentFromMappedBlock(mappedBlock: MappedBlockModel) {
  const blockType = getBlockTypeFromMappedBlock(mappedBlock);
  return getComponentFromBlockType(blockType);
}

export function mapBlockToMappedBlock(
  block: BlockModel,
  blocks: BlocksModel,
  styles: StylesModels
): MappedBlockModel {
  const styleKey = getStyleKeyFromBlock(block);
  return {
    key: block.key,
    blockTypeKey: block.blockTypeKey,
    props: parseMappedBlockPropsValues(block, blocks, styles),
    styles: getMappedBlockStyles(styleKey, styles),
  };
}

export function mapBlocksToMappedBlocks(
  blocks: BlocksModel,
  blockKeys: Array<string>,
  styles: StylesModels
): Array<MappedBlockModel> {
  return blockKeys.map(blockKey => {
    const block = getBlockFromBlocks(blockKey, blocks);
    return mapBlockToMappedBlock(block, blocks, styles);
  });
}

export function mapComponentBlocksToMappedBlocks(
  component: ComponentModel,
  styles: StylesModels
): Array<MappedBlockModel> {
  const blocks = getBlocksFromComponent(component);
  const rootBlockKey = getRootBlockKeyFromComponent(component);
  return mapBlocksToMappedBlocks(blocks, [rootBlockKey], styles);
}
