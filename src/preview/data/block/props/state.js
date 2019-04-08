// @flow
import { get } from 'lodash';
import { REPEATER_DATA_PROP_CONFIG } from 'data/block/props/data';
import type { BlockModel, BlocksModel } from '../../../../data/block/model';
import type {
  MappedBlockModel,
  MappedBlockParsedPropsModel,
  MappedBlockPropsModel,
  MappedBlockToBlockReplacement,
} from '../model';
import {
  getAvailablePropKeysFromBlock,
  getBlockChildrenKeysFromBlock,
  getBlockKey,
  getMergedPropConfigFromBlock,
  getPropFromBlock,
  getPropsFromBlock,
  isBlockRepeater,
} from '../../../../data/block/state';
import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigTypes,
  BlockPropsModel,
} from '../../../../data/block/props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../data/block/props/model';
import {
  getPropFromProps,
  parseBlockPropValue,
  parsePropBlocksValue,
} from '../../../../data/block/props/state';
import { mapBlocksToMappedBlocks, mapComponentBlocksToMappedBlocks } from '../state';
import type { StylesModels } from '../../../../data/styles/model';
import {
  getRepeaterDataItems,
  isPropConfigBlockType,
  isPropConfigComponentReferenceType,
  isPropConfigRepeaterDataType,
} from '../../../../data/block/props/types/state';
import type { ComponentsModels } from '../../../../data/component/model';
import { getRootBlockKeyFromComponent } from '../../../../data/component/state';
import type { RepeaterDataPropModel } from '../../../../data/block/props/types/model';
import { CHILDREN_PROP_CONFIG } from '../../../../data/block/props/data';

export type RepeaterIndexes = {
  [string]: number,
};

export function parseMappedBlockPropBlocksValue(
  propValue: any,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  repeaterIndexes: RepeaterIndexes
): Array<MappedBlockModel> {
  if (!propValue) {
    return [];
  }
  const blockKeys = parsePropBlocksValue(propValue);
  return mapBlocksToMappedBlocks(
    blocks,
    blockKeys,
    styles,
    parsedProps,
    components,
    mappedBlockToBlock,
    repeaterIndexes
  );
}

export function parseMappedBlockPropComponentImportValue(
  propValue: any,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string,
  repeaterIndexes: RepeaterIndexes
): Array<MappedBlockModel> {
  if (!propValue) return [];
  const component = components[propValue];
  if (!component) return [];
  return mapComponentBlocksToMappedBlocks(
    component,
    styles,
    parsedProps,
    components,
    {
      ...mappedBlockToBlock,
      [getRootBlockKeyFromComponent(component)]: blockKey,
    },
    repeaterIndexes
  );
}

export function getPropValueAndTypeFromParsedProps(
  blockKey: string,
  propKey: string,
  parsedProps: MappedBlockParsedPropsModel,
  mappedBlockToBlock: MappedBlockToBlockReplacement
): {
  propValue: any,
  propType: BlockPropsConfigTypes,
} | null {
  const mappedBlockKey = mappedBlockToBlock[blockKey];

  let prop;

  if (mappedBlockKey) {
    const mappedBlockParsedProps = parsedProps[mappedBlockKey];
    if (mappedBlockParsedProps) {
      if (mappedBlockParsedProps[propKey]) {
        prop = mappedBlockParsedProps[propKey];
      }
    }
  }

  if (!prop) {
    const blockProps = parsedProps[blockKey];
    console.log('blockProps', blockProps);
    if (!blockProps) {
      console.warn(`No props matched for block "${blockKey}".`);
      return null;
    }
    prop = blockProps[propKey];
  }
  if (!prop) {
    console.warn(`Could not match prop "${propKey}" within block props.`);
    return null;
  }
  return {
    propValue: prop.value,
    propType: prop.type,
  };
}

export function parseMappedRepeaterBlocksPropValue(
  blockKey: string,
  allProps: BlockPropsModel,
  propValue: any,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  repeaterIndexes: RepeaterIndexes
): Array<Array<MappedBlockModel>> {
  const repeaterDataValue = getPropFromProps(REPEATER_DATA_PROP_CONFIG.key, allProps).value;
  const items = getRepeaterDataItems(repeaterDataValue);
  return items.map((item, index) =>
    parseMappedBlockPropBlocksValue(
      propValue,
      blocks,
      styles,
      parsedProps,
      components,
      mappedBlockToBlock,
      {
        ...repeaterIndexes,
        [blockKey]: index,
      }
    )
  );
}

export function parsePropValue(
  allProps: BlockPropsModel,
  propValue: any,
  propType: BlockPropsConfigTypes,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string,
  repeaterIndexes: RepeaterIndexes,
  isRepeater: boolean = false
): any {
  switch (propType) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
      if (isRepeater) {
        return parseMappedRepeaterBlocksPropValue(
          blockKey,
          allProps,
          propValue,
          blocks,
          styles,
          parsedProps,
          components,
          mappedBlockToBlock,
          repeaterIndexes
        );
      }
      return parseMappedBlockPropBlocksValue(
        propValue,
        blocks,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock,
        repeaterIndexes
      );
    case BLOCK_PROPS_CONFIG_TYPES.componentReference:
      return parseMappedBlockPropComponentImportValue(
        propValue,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock,
        blockKey,
        repeaterIndexes
      );
    default:
      return propValue;
  }
}

export function getPropValueFromRepeaterData(
  prop: RepeaterDataPropModel,
  fieldKey: string,
  index: number
): any {
  const itemKey = get(prop, `data.order[${index}]`, '');
  return get(prop, `data.items[${itemKey}].values[${fieldKey}].value`, '');
}

export function parseMappedBlockPropLinkedValue(
  allProps: BlockPropsModel,
  prop: BlockPropModel,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  originalBlockKey: string,
  repeaterIndexes: RepeaterIndexes
): any {
  if (!prop.linked) {
    throw new Error(`This function should only be called when prop has linked values.`);
  }
  const { blockKey, propKey, repeaterFieldKey = '' } = prop.linked;
  const parsedProp = getPropValueAndTypeFromParsedProps(
    blockKey,
    propKey,
    parsedProps,
    mappedBlockToBlock
  );
  if (!parsedProp) {
    return null;
  }
  const { propValue, propType } = parsedProp;
  let finalPropValue = propValue;
  if (propType === BLOCK_PROPS_CONFIG_TYPES.repeaterData) {
    let repeaterIndex = repeaterIndexes[blockKey];
    if (typeof repeaterIndex === 'undefined') {
      console.error(`No repeaterIndex matched.`, repeaterIndexes);
      repeaterIndex = 0;
    }
    finalPropValue = getPropValueFromRepeaterData(propValue, repeaterFieldKey, repeaterIndex);
  }
  return parsePropValue(
    allProps,
    finalPropValue,
    propType,
    blocks,
    styles,
    parsedProps,
    components,
    mappedBlockToBlock,
    originalBlockKey,
    repeaterIndexes
  );
}

export function parseMappedBlockPropValue(
  prop: BlockPropModel | null,
  allProps: BlockPropsModel,
  blocks: BlocksModel,
  propConfig: BlockPropConfigModel | null,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string,
  repeaterIndexes: RepeaterIndexes,
  isRepeater: boolean = false
): any {
  if (!prop) {
    if (propConfig && propConfig.defaultValue) {
      return propConfig.defaultValue;
    }
    return null;
  }
  if (prop.linked) {
    return parseMappedBlockPropLinkedValue(
      allProps,
      prop,
      blocks,
      styles,
      parsedProps,
      components,
      mappedBlockToBlock,
      blockKey,
      repeaterIndexes
    );
  }
  if (!propConfig) {
    return prop.value;
  }
  return parsePropValue(
    allProps,
    prop.value,
    propConfig.type,
    blocks,
    styles,
    parsedProps,
    components,
    mappedBlockToBlock,
    blockKey,
    repeaterIndexes,
    isRepeater
  );
}

export function parseMappedBlockPropsValues(
  block: BlockModel,
  blocks: BlocksModel,
  styles: StylesModels,
  allParsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  repeaterIndexes: RepeaterIndexes
): MappedBlockPropsModel {
  const blockKey = getBlockKey(block);
  const availablePropKeys = getAvailablePropKeysFromBlock(block);
  const availableOtherPropKeys = [];
  const availableChildrenPropKeys = [];
  availablePropKeys.forEach(propKey => {
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    const propIsBlockType = isPropConfigBlockType(propConfig);
    if (propIsBlockType || isPropConfigComponentReferenceType(propConfig)) {
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
      value: parseMappedBlockPropValue(
        prop,
        props,
        blocks,
        propConfig,
        styles,
        allParsedProps,
        components,
        mappedBlockToBlock,
        blockKey,
        repeaterIndexes
      ),
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
      value: parseMappedBlockPropValue(
        prop,
        props,
        blocks,
        propConfig,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock,
        blockKey,
        repeaterIndexes,
        isBlockRepeater(block)
      ),
      type: propConfig && propConfig.type ? propConfig.type : BLOCK_PROPS_CONFIG_TYPES.string,
    };
  });
  return {
    ...parsedOtherProps,
    ...parsedChildrenProps,
  };
}
