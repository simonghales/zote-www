// @flow

import type { BlockModel, BlocksModel } from '../../../../data/block/model';
import type { MappedBlockModel, MappedBlockPropsModel } from '../model';
import {
  getAvailablePropKeysFromBlock,
  getMergedPropConfigFromBlock,
  getPropsFromBlock,
} from '../../../../data/block/state';
import type { BlockPropConfigModel, BlockPropModel } from '../../../../data/block/props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../data/block/props/model';
import { parsePropBlocksValue } from '../../../../data/block/props/state';
import { mapBlocksToMappedBlocks } from '../state';
import type { StylesModels } from '../../../../data/styles/model';

export function parseMappedBlockPropBlocksValue(
  prop: BlockPropModel,
  blocks: BlocksModel,
  styles: StylesModels
): Array<MappedBlockModel> {
  if (!prop.value) {
    return [];
  }
  const blockKeys = parsePropBlocksValue(prop.value);
  return mapBlocksToMappedBlocks(blocks, blockKeys, styles);
}

export function parseMappedBlockPropValue(
  prop: BlockPropModel | null,
  blocks: BlocksModel,
  propConfig: BlockPropConfigModel | null,
  styles: StylesModels
): any {
  if (!prop) {
    if (propConfig && propConfig.defaultValue) {
      return propConfig.defaultValue;
    }
    return null;
  }
  if (!propConfig) {
    return prop.value;
  }
  switch (propConfig.type) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
      return parseMappedBlockPropBlocksValue(prop, blocks, styles);
    default:
      return prop.value;
  }
}

export function parseMappedBlockPropsValues(
  block: BlockModel,
  blocks: BlocksModel,
  styles: StylesModels
): MappedBlockPropsModel {
  const availablePropKeys = getAvailablePropKeysFromBlock(block);
  const props = getPropsFromBlock(block);
  const parsedProps = {};
  availablePropKeys.forEach(propKey => {
    const prop = props[propKey];
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    parsedProps[propKey] = {
      value: parseMappedBlockPropValue(prop, blocks, propConfig, styles),
      type: propConfig && propConfig.type ? propConfig.type : BLOCK_PROPS_CONFIG_TYPES.string,
    };
  });
  return parsedProps;
}
