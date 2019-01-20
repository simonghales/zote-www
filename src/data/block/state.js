// @flow
import { get } from 'lodash';
import type { BlockModel, BlocksModel } from './model';
import type { BlockPropConfigModel, BlockPropModel, BlockPropsConfigModel } from './props/model';
import { BLOCK_PROPS_CONFIG_TYPES, COMMON_PROPS } from './props/model';
import type { BlockTypeModel } from './types/model';
import { BLOCK_TYPES } from './types/data';
import { getPropsConfigFromBlockType } from './types/state';
import { getPropConfigFromPropsConfig, parsePropValue } from './props/state';
import type { ParsedPropBlocksValue } from './props/state';

export function getBlockStyleKeyFormat(blockKey: string): string {
  return `block::${blockKey}`;
}

export function getStyleKeyFromBlock(block: BlockModel): string {
  if (block.styles && block.styles.stylesKey) {
    return block.styles.stylesKey;
  }
  return getBlockStyleKeyFormat(block.key);
}

export function getPropFromBlock(propKey: string, block: BlockModel): BlockPropModel | null {
  return get(block, `props[${propKey}]`, null);
}

export function getPropsConfigFromBlock(block: BlockModel): BlockPropsConfigModel {
  const { propsConfig = {} } = block;
  return propsConfig;
}

export function getPropConfigFromBlock(
  propKey: string,
  block: BlockModel
): BlockPropConfigModel | null {
  const propsConfig = getPropsConfigFromBlock(block);
  return getPropConfigFromPropsConfig(propKey, propsConfig);
}

export function getBlockTypeKeyFromBlock(block: BlockModel): string {
  return block.blockTypeKey;
}

export function getBlockTypeFromBlock(block: BlockModel): BlockTypeModel {
  const blockTypeKey = getBlockTypeKeyFromBlock(block);
  const blockType = BLOCK_TYPES[blockTypeKey];
  if (!blockType) {
    throw new Error(`Block Type "${blockTypeKey}" not found within block types.`);
  }
  return blockType;
}

export function getPropsConfigFromBlockBlockType(block: BlockModel): BlockPropsConfigModel {
  const blockType = getBlockTypeFromBlock(block);
  const blockTypePropsConfig = getPropsConfigFromBlockType(blockType);
  return blockTypePropsConfig;
}

export function getPropConfigFromBlockBlockType(
  propKey: string,
  block: BlockModel
): BlockPropConfigModel | null {
  const blockTypePropsConfig = getPropsConfigFromBlockBlockType(block);
  return getPropConfigFromPropsConfig(propKey, blockTypePropsConfig);
}

export function getMergedPropConfigFromBlock(
  propKey: string,
  block: BlockModel
): BlockPropConfigModel | null {
  const blockTypePropConfig = getPropConfigFromBlockBlockType(propKey, block);
  const blockPropConfig = getPropConfigFromBlock(propKey, block);
  let mergedPropConfig = null;
  if (blockTypePropConfig) {
    mergedPropConfig = {
      ...blockTypePropConfig,
    };
  }
  if (blockPropConfig) {
    mergedPropConfig = {
      ...blockPropConfig,
    };
  }
  return mergedPropConfig;
}

export function getPropValueFromBlock(propKey: string, block: BlockModel): any {
  const prop = getPropFromBlock(propKey, block);
  return prop ? prop.value : null;
}

export function getBlockChildrenKeysFromBlock(block: BlockModel): Array<string> {
  const childrenProp = getPropFromBlock(COMMON_PROPS.children, block);
  if (!childrenProp) {
    return [];
  }
  const childrenPropConfig = getMergedPropConfigFromBlock(COMMON_PROPS.children, block);
  if (!childrenPropConfig) {
    return [];
  }
  if (childrenPropConfig.type === BLOCK_PROPS_CONFIG_TYPES.blocks) {
    const value: any = parsePropValue(childrenProp, childrenPropConfig.type);
    return (value: ParsedPropBlocksValue);
  }
  return [];
}

export function getBlockFromBlocks(blockKey: string, blocks: BlocksModel): BlockModel {
  const block = blocks[blockKey];
  if (!block) {
    throw new Error(`Block "${blockKey}" not found within blocks.`);
  }
  return block;
}

export function doesBlockAllowChildBlocks(block: BlockModel): boolean {
  const childrenPropConfig = getMergedPropConfigFromBlock(COMMON_PROPS.children, block);
  return !!childrenPropConfig && childrenPropConfig.type === BLOCK_PROPS_CONFIG_TYPES.blocks;
}

export function getNameFromBlock(block: BlockModel): string {
  return block.name;
}
