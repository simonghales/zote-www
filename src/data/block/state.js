// @flow
import type { BlockModel, BlocksModel } from './model';
import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigModel,
  BlockPropsModel,
} from './props/model';
import { BLOCK_PROPS_CONFIG_TYPES, BLOCK_PROPS_DISPLAY_SECTIONS } from './props/model';
import { CHILDREN_PROP_CONFIG, ELEMENT_PROP_CONFIG } from './props/data';
import type { BlockTypeModel } from './types/model';
import { BLOCK_TYPES } from './types/data';
import { getPropsConfigFromBlockType } from './types/state';
import {
  getPropConfigFromPropsConfig,
  getSortingPriorityFromPropConfig,
  parsePropValue,
} from './props/state';
import type { ParsedPropBlocksValue } from './props/state';
import { isValueDefined } from '../../utils/validation';
import { isHtmlElementVoid } from '../../utils/html';

export function getBlockStyleKeyFormat(blockKey: string): string {
  return `block::${blockKey}`;
}

export function getStyleKeyFromBlock(block: BlockModel): string {
  if (block.styles && block.styles.stylesKey) {
    return block.styles.stylesKey;
  }
  return getBlockStyleKeyFormat(block.key);
}

export function getPropsFromBlock(block: BlockModel): BlockPropsModel {
  const { props = {} } = block;
  return props;
}

export function getPropFromBlock(propKey: string, block: BlockModel): BlockPropModel | null {
  const props = getPropsFromBlock(block);
  return props[propKey] ? props[propKey] : null;
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

export function getMergedPropsConfigFromBlock(block: BlockModel): BlockPropsConfigModel {
  const mergedPropsConfig = {};
  const availablePropsKeys = {};
  const propsConfig = getPropsConfigFromBlock(block);
  const blockTypePropsConfig = getPropsConfigFromBlockBlockType(block);
  Object.keys(propsConfig).forEach(propKey => {
    availablePropsKeys[propKey] = true;
  });
  Object.keys(blockTypePropsConfig).forEach(propKey => {
    availablePropsKeys[propKey] = true;
  });
  Object.keys(availablePropsKeys).forEach(propKey => {
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    if (propConfig) {
      mergedPropsConfig[propKey] = propConfig;
    }
  });
  return mergedPropsConfig;
}

export function getPropValueFromBlock(propKey: string, block: BlockModel): any {
  const prop = getPropFromBlock(propKey, block);
  return prop ? prop.value : null;
}

export function getPropValueFromBlockWithDefaultFallback(propKey: string, block: BlockModel): any {
  const propValue = getPropValueFromBlock(propKey, block);
  if (isValueDefined(propValue)) {
    return propValue;
  }
  const propConfig = getMergedPropConfigFromBlock(propKey, block);
  if (propConfig && isValueDefined(propConfig.defaultValue)) {
    return propConfig.defaultValue;
  }
  return null;
}

export function getBlockChildrenKeysFromBlock(block: BlockModel): Array<string> {
  const childrenProp = getPropFromBlock(CHILDREN_PROP_CONFIG.key, block);
  if (!childrenProp) {
    return [];
  }
  const childrenPropConfig = getMergedPropConfigFromBlock(CHILDREN_PROP_CONFIG.key, block);
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
  const childrenPropConfig = getMergedPropConfigFromBlock(CHILDREN_PROP_CONFIG.key, block);
  const childrenAllowed =
    !!childrenPropConfig && childrenPropConfig.type === BLOCK_PROPS_CONFIG_TYPES.blocks;
  if (childrenAllowed) {
    const elementPropConfig = getMergedPropConfigFromBlock(ELEMENT_PROP_CONFIG.key, block);
    if (elementPropConfig && elementPropConfig.type === BLOCK_PROPS_CONFIG_TYPES.html) {
      const elementValue = getPropValueFromBlockWithDefaultFallback(ELEMENT_PROP_CONFIG.key, block);
      return !isHtmlElementVoid(elementValue); // todo - might not be stable
    }
  }
  return childrenAllowed;
}

export function getNameFromBlock(block: BlockModel): string {
  return block.name;
}

export function getAvailablePropKeysFromBlock(block: BlockModel): Array<string> {
  const availableProps = {};
  const props = getPropsFromBlock(block);
  Object.keys(props).forEach(propKey => {
    availableProps[propKey] = true;
  });
  const propsConfig = getMergedPropsConfigFromBlock(block);
  Object.keys(propsConfig).forEach(propKey => {
    availableProps[propKey] = true;
  });
  return Object.keys(availableProps);
}

export function getBlockVisibleProps(block: BlockModel): Array<BlockPropConfigModel> {
  const mergedPropsConfig = getMergedPropsConfigFromBlock(block);
  return Object.keys(mergedPropsConfig)
    .filter(propKey => {
      const propConfig = mergedPropsConfig[propKey];
      return !propConfig.hidden;
    })
    .map(propKey => mergedPropsConfig[propKey]);
}

export function getBlockContentProps(block: BlockModel): Array<BlockPropConfigModel> {
  const visiblePropsConfig = getBlockVisibleProps(block);
  return visiblePropsConfig.filter(
    propConfig =>
      !propConfig.displaySection || propConfig.displaySection !== BLOCK_PROPS_DISPLAY_SECTIONS.html
  );
}

export function getBlockHtmlProps(block: BlockModel): Array<BlockPropConfigModel> {
  const visiblePropsConfig = getBlockVisibleProps(block);
  return visiblePropsConfig.filter(
    propConfig =>
      propConfig.displaySection && propConfig.displaySection === BLOCK_PROPS_DISPLAY_SECTIONS.html
  );
}

export function sortBlockPropsConfig(
  propsConfig: Array<BlockPropConfigModel>
): Array<BlockPropConfigModel> {
  return propsConfig.sort((configA, configB) => {
    const configASortingPriority = getSortingPriorityFromPropConfig(configA);
    const configBSortingPriority = getSortingPriorityFromPropConfig(configB);
    return configBSortingPriority - configASortingPriority;
  });
}
