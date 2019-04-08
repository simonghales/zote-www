// @flow
import type { BlockModel, BlocksModel } from './model';
import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigModel,
  BlockPropsConfigTypes,
  BlockPropsModel,
} from './props/model';
import { BLOCK_PROPS_CONFIG_TYPES, BLOCK_PROPS_DISPLAY_SECTIONS } from './props/model';
import { CHILDREN_PROP_CONFIG, ELEMENT_PROP_CONFIG } from './props/data';
import type { BlockTypeModel } from './types/model';
import { BLOCK_TYPES } from './types/data';
import {
  getAddPropsEnabledFromBlockType,
  getHtmlEnabledFromBlockType,
  getPropsConfigFromBlockType,
  getPropsEnabledFromBlockType,
  getStylesEnabledFromBlockType,
} from './types/state';
import type { ParsedPropBlocksValue } from './props/state';
import {
  getPropConfigFromPropsConfig,
  getSortingPriorityFromPropConfig,
  parsePropValue,
} from './props/state';
import { isValueDefined } from '../../utils/validation';
import { isHtmlElementVoid } from '../../utils/html';
import ComponentImport from './types/groups/component/ComponentImport';
import type { ComponentsModels } from '../component/model';
import {
  getBlockFromComponent,
  getComponentFromComponents,
  getComponentName,
  getRootBlockKeyFromComponent,
} from '../component/state';
import type { RepeaterDataPropModel } from './props/types/model';
import { getRepeaterDataFields } from './props/types/state';

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

export function getBlockDescendantKeysFromBlock(
  block: BlockModel,
  blocks: BlocksModel
): Array<string> {
  const childrenKeys = getBlockChildrenKeysFromBlock(block);
  const descendantKeys = {};
  childrenKeys.forEach(blockKey => {
    const childBlock = getBlockFromBlocks(blockKey, blocks);
    const childBlockChildrenKeys = getBlockChildrenKeysFromBlock(childBlock);
    childBlockChildrenKeys.forEach(childBlockKey => {
      descendantKeys[childBlockKey] = true;
    });
  });
  return childrenKeys.concat(Object.keys(descendantKeys));
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

export function getPropsEnabledFromBlock(block: BlockModel): boolean {
  const blockType = getBlockTypeFromBlock(block);
  return getPropsEnabledFromBlockType(blockType);
}

export function getStylesEnabledFromBlock(block: BlockModel): boolean {
  const blockType = getBlockTypeFromBlock(block);
  return getStylesEnabledFromBlockType(blockType);
}

export function getHtmlEnabledFromBlock(block: BlockModel): boolean {
  const blockType = getBlockTypeFromBlock(block);
  return getHtmlEnabledFromBlockType(blockType);
}

export function getAddPropsEnabledFromBlock(block: BlockModel): boolean {
  const blockType = getBlockTypeFromBlock(block);
  return getAddPropsEnabledFromBlockType(blockType);
}

export function getBlockPropsConfigKeys(block: BlockModel): Array<string> {
  const blockPropsConfig = getMergedPropsConfigFromBlock(block);
  return Object.keys(blockPropsConfig);
}

export function doesBlockChildrenContainBlockKey(block: BlockModel, blockKey: string): boolean {
  const blockChildrenKeys = getBlockChildrenKeysFromBlock(block);
  return blockChildrenKeys.includes(blockKey);
}

export function getBlockParentBlockKeyFromBlocks(
  blockToMatchKey: string,
  blocks: BlocksModel
): string | null {
  let parentKey = null;
  Object.keys(blocks).forEach(blockKey => {
    const block = getBlockFromBlocks(blockKey, blocks);
    if (doesBlockChildrenContainBlockKey(block, blockToMatchKey)) {
      parentKey = blockKey; // todo - break?
    }
  });
  return parentKey;
}

export type AvailablePropModel = {
  value: any,
  config: BlockPropConfigModel,
};
export type AvailablePropsModel = {
  [string]: AvailablePropModel,
};
export type BlockAvailablePropsModel = {
  blockKey: string,
  blockName: string,
  props: AvailablePropsModel,
};
export type AllBlocksAvailablePropsModel = {
  [string]: AvailablePropsModel,
};

export function getPropFromAllBlocksAvailableProps(
  propKey: string,
  blockKey: string,
  allBlocksAvailableProps: AllBlocksAvailablePropsModel
): AvailablePropModel | null {
  if (allBlocksAvailableProps[blockKey]) {
    if (
      allBlocksAvailableProps[blockKey].props &&
      isValueDefined(allBlocksAvailableProps[blockKey].props[propKey])
    ) {
      return allBlocksAvailableProps[blockKey].props[propKey];
    }
  }
  return null;
}

export function getBlockPropAvailableParsedValue(
  propKey: string,
  propConfig: BlockPropConfigModel,
  block: BlockModel,
  allBlocksAvailableProps: AllBlocksAvailablePropsModel
): any {
  const prop = getPropFromBlock(propKey, block);
  if (!prop) {
    return null;
  }
  if (!prop.linked) {
    return prop.value;
  }
  const { blockKey, propKey: linkedPropKey } = prop.linked;
  const availableProp = getPropFromAllBlocksAvailableProps(
    linkedPropKey,
    blockKey,
    allBlocksAvailableProps
  );
  if (!availableProp) return null;
  return availableProp.value;
}

export function getRecursiveBlockPropAvailableProps(
  blockKey: string,
  finalBlockKey: string,
  blocks: BlocksModel,
  ancestorBlockKeys: Array<string>,
  allBlocksAvailableProps: AllBlocksAvailablePropsModel
): Array<BlockAvailablePropsModel> {
  if (!ancestorBlockKeys.includes(blockKey)) return [];
  if (blockKey === finalBlockKey) return [];
  const block = getBlockFromBlocks(blockKey, blocks);
  const propsConfig = getMergedPropsConfigFromBlock(block);
  const childrenTypePropsKeys = [];
  // note - currently assuming that `children` is the only prop
  const otherTypePropsKeys = [];
  Object.keys(propsConfig).forEach(propKey => {
    const propConfig = propsConfig[propKey];
    if (propConfig.type === BLOCK_PROPS_CONFIG_TYPES.blocks) {
      childrenTypePropsKeys.push(propKey);
    } else {
      otherTypePropsKeys.push(propKey);
    }
  });
  const availableProps: AvailablePropsModel = {};
  otherTypePropsKeys.forEach(propKey => {
    const propConfig = propsConfig[propKey];
    availableProps[propKey] = {
      value: getBlockPropAvailableParsedValue(propKey, propConfig, block, allBlocksAvailableProps),
      config: propConfig,
    };
  });
  const mergedAllBlocksAvailableProps = {
    ...allBlocksAvailableProps,
    [blockKey]: {
      props: availableProps,
    },
  };
  const childrenBlockKeys = getBlockChildrenKeysFromBlock(block);
  let childrenBlocksAvailableProps: Array<BlockAvailablePropsModel> = [];
  if (!doesBlockChildrenContainBlockKey(block, finalBlockKey)) {
    childrenBlockKeys.forEach(childBlockKey => {
      childrenBlocksAvailableProps = childrenBlocksAvailableProps.concat(
        getRecursiveBlockPropAvailableProps(
          childBlockKey,
          finalBlockKey,
          blocks,
          ancestorBlockKeys,
          mergedAllBlocksAvailableProps
        )
      );
    });
  }
  return [
    {
      blockKey,
      blockName: block.name,
      props: availableProps,
    },
  ].concat(childrenBlocksAvailableProps);
}

export function getRepeaterDataProps(
  propKey: string,
  prop: AvailablePropModel,
  propType: BlockPropsConfigTypes
): AvailablePropsModel {
  const props = {};
  const propValue: RepeaterDataPropModel = prop.value;
  const repeaterFields = getRepeaterDataFields(propValue);
  repeaterFields.forEach(field => {
    if (field.type === propType) {
      props[`${propKey}::${field.key}`] = {
        value: field.label,
        config: prop.config,
      };
    }
  });
  return props;
}

export function filterAvailableProps(
  availableProps: Array<BlockAvailablePropsModel>,
  propType: BlockPropsConfigTypes
): Array<BlockAvailablePropsModel> {
  return availableProps
    .map(block => {
      let props = {};
      Object.keys(block.props).forEach(propKey => {
        const prop = block.props[propKey];
        if (prop.config.type === propType) {
          props[propKey] = prop;
        } else if (prop.config.type === BLOCK_PROPS_CONFIG_TYPES.repeaterData) {
          const repeaterProps = getRepeaterDataProps(propKey, prop, propType);
          props = {
            ...props,
            ...repeaterProps,
          };
        }
      });
      console.log('props', props);
      return {
        ...block,
        props,
      };
    })
    .filter(block => Object.keys(block.props).length > 0);
}

export function getTargetBlockAncestorsKeys(
  blockKey: string,
  targetBlockKey: string,
  blocks: BlocksModel
): Array<string> {
  if (blockKey === targetBlockKey) {
    return [];
  }
  const block = getBlockFromBlocks(blockKey, blocks);
  const childrenBlockKeys = getBlockChildrenKeysFromBlock(block);
  let ancestorKeys = [];
  childrenBlockKeys.forEach(childBlockKey => {
    if (targetBlockKey === childBlockKey) {
      ancestorKeys = [blockKey];
    } else {
      const targetAncestorKeys = getTargetBlockAncestorsKeys(childBlockKey, targetBlockKey, blocks);
      if (targetAncestorKeys.length > 0) {
        ancestorKeys = [blockKey].concat(targetAncestorKeys);
      }
    }
  });
  return ancestorKeys;
}

export function getBlockIndexInParentChildren(blockKey: string, parentBlock: BlockModel) {
  const children = getBlockChildrenKeysFromBlock(parentBlock);
  return children.indexOf(blockKey);
}

export function getBlockName(block: BlockModel): string {
  return block.name;
}

export function getBlockKey(block: BlockModel): string {
  return block.key;
}

export function getBlockComponentImportKey(block: BlockModel): string {
  if (block.blockTypeKey !== ComponentImport.key) {
    return '';
  }
  return getPropValueFromBlock(ComponentImport.propsConfig.componentReference.key, block);
}

export function getBlockNameWithComponents(
  block: BlockModel,
  components: ComponentsModels
): string {
  const componentImportKey = getBlockComponentImportKey(block);
  if (componentImportKey) {
    const component = getComponentFromComponents(componentImportKey, components);
    return getComponentName(component);
  }
  return getBlockName(block);
}

export function getBlockComponentImportedContentProps(
  block: BlockModel,
  components: ComponentsModels
): Array<BlockPropConfigModel> {
  const componentKey = getBlockComponentImportKey(block);
  if (!componentKey) return [];
  const component = getComponentFromComponents(componentKey, components);
  const componentRootBlockKey = getRootBlockKeyFromComponent(component);
  const rootBlock = getBlockFromComponent(component, componentRootBlockKey);
  const componentRootBlockProps = getBlockContentProps(rootBlock);
  return componentRootBlockProps.map(blockPropConfig => ({
    ...blockPropConfig,
    editable: false,
    deletable: false,
  }));
}
