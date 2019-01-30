// @flow

import type { BlockModel, BlocksModel } from '../../../../data/block/model';
import type {
  MappedBlockModel,
  MappedBlockParsedPropsModel,
  MappedBlockPropsModel,
} from '../model';
import {
  getAvailablePropKeysFromBlock,
  getMergedPropConfigFromBlock,
  getPropsFromBlock,
} from '../../../../data/block/state';
import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigTypes,
} from '../../../../data/block/props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../data/block/props/model';
import { parsePropBlocksValue } from '../../../../data/block/props/state';
import { mapBlocksToMappedBlocks } from '../state';
import type { StylesModels } from '../../../../data/styles/model';
import { isPropConfigBlockType } from '../../../../data/block/props/types/state';

export function parseMappedBlockPropBlocksValue(
  propValue: any,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel
): Array<MappedBlockModel> {
  if (!propValue) {
    return [];
  }
  const blockKeys = parsePropBlocksValue(propValue);
  return mapBlocksToMappedBlocks(blocks, blockKeys, styles, parsedProps);
}

export function getPropValueAndTypeFromParsedProps(
  blockKey: string,
  propKey: string,
  parsedProps: MappedBlockParsedPropsModel
): {
  propValue: any,
  propType: BlockPropsConfigTypes,
} | null {
  const blockProps = parsedProps[blockKey];
  if (!blockProps) {
    console.warn(`No props matched for block "${blockKey}".`);
    return null;
  }
  const prop = blockProps[propKey];
  if (!prop) {
    console.warn(`Could not match prop "${propKey}" within block props.`);
    return null;
  }
  return {
    propValue: prop.value,
    propType: prop.type,
  };
}

export function parsePropValue(
  propValue: any,
  propType: BlockPropsConfigTypes,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel
): any {
  switch (propType) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
      return parseMappedBlockPropBlocksValue(propValue, blocks, styles, parsedProps);
    default:
      return propValue;
  }
}

export function parseMappedBlockPropLinkedValue(
  prop: BlockPropModel,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel
): any {
  if (!prop.linked) {
    throw new Error(`This function should only be called when prop has linked values.`);
  }
  const { blockKey, propKey } = prop.linked;
  const parsedProp = getPropValueAndTypeFromParsedProps(blockKey, propKey, parsedProps);
  if (!parsedProp) {
    return null;
  }
  const { propValue, propType } = parsedProp;
  return parsePropValue(propValue, propType, blocks, styles, parsedProps);
}

export function parseMappedBlockPropValue(
  prop: BlockPropModel | null,
  blocks: BlocksModel,
  propConfig: BlockPropConfigModel | null,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel
): any {
  if (!prop) {
    if (propConfig && propConfig.defaultValue) {
      return propConfig.defaultValue;
    }
    return null;
  }
  if (prop.linked) {
    return parseMappedBlockPropLinkedValue(prop, blocks, styles, parsedProps);
  }
  if (!propConfig) {
    return prop.value;
  }
  return parsePropValue(prop.value, propConfig.type, blocks, styles, parsedProps);
}

export function parseMappedBlockPropsValues(
  block: BlockModel,
  blocks: BlocksModel,
  styles: StylesModels,
  allParsedProps: MappedBlockParsedPropsModel
): MappedBlockPropsModel {
  const availablePropKeys = getAvailablePropKeysFromBlock(block);
  const availableOtherPropKeys = [];
  const availableChildrenPropKeys = [];
  availablePropKeys.forEach(propKey => {
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    if (isPropConfigBlockType(propConfig)) {
      availableChildrenPropKeys.push(propKey);
    } else {
      availableOtherPropKeys.push(propKey);
    }
  });
  const props = getPropsFromBlock(block);
  const parsedOtherProps: MappedBlockPropsModel = {};
  availableOtherPropKeys.forEach(propKey => {
    const prop = props[propKey];
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    parsedOtherProps[propKey] = {
      value: parseMappedBlockPropValue(prop, blocks, propConfig, styles, allParsedProps),
      type: propConfig && propConfig.type ? propConfig.type : BLOCK_PROPS_CONFIG_TYPES.string,
    };
  });
  const parsedProps: MappedBlockParsedPropsModel = {
    ...allParsedProps,
    [block.key]: {
      ...parsedOtherProps,
    },
  };
  const parsedChildrenProps: MappedBlockPropsModel = {};
  availableChildrenPropKeys.forEach(propKey => {
    const prop = props[propKey];
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    parsedChildrenProps[propKey] = {
      value: parseMappedBlockPropValue(prop, blocks, propConfig, styles, parsedProps),
      type: propConfig && propConfig.type ? propConfig.type : BLOCK_PROPS_CONFIG_TYPES.string,
    };
  });
  return {
    ...parsedOtherProps,
    ...parsedChildrenProps,
  };
}
