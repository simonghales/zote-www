// @flow
import { get } from 'lodash';
import type { BlockModel, BlocksModel } from '../../../../data/block/model';
import type {
  MappedBlockModel,
  MappedBlockParsedPropsModel,
  MappedBlockPropsModel,
  MappedBlockToBlockReplacement,
} from '../model';
import {
  getAvailablePropKeysFromBlock,
  getBlockKey,
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
import { mapBlocksToMappedBlocks, mapComponentBlocksToMappedBlocks } from '../state';
import type { StylesModels } from '../../../../data/styles/model';
import {
  isPropConfigBlockType,
  isPropConfigComponentReferenceType,
} from '../../../../data/block/props/types/state';
import type { ComponentsModels } from '../../../../data/component/model';
import { getComponentKey, getRootBlockKeyFromComponent } from '../../../../data/component/state';
import { isValueDefined } from '../../../../utils/validation';
import type { RepeaterDataPropModel } from '../../../../data/block/props/types/model';

export function parseMappedBlockPropBlocksValue(
  propValue: any,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement
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
    mappedBlockToBlock
  );
}

export function parseMappedBlockPropComponentImportValue(
  propValue: any,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string
): Array<MappedBlockModel> {
  if (!propValue) return [];
  const component = components[propValue];
  if (!component) return [];
  return mapComponentBlocksToMappedBlocks(component, styles, parsedProps, components, {
    ...mappedBlockToBlock,
    [getRootBlockKeyFromComponent(component)]: blockKey,
  });
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

export function parsePropValue(
  propValue: any,
  propType: BlockPropsConfigTypes,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string
): any {
  switch (propType) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
      return parseMappedBlockPropBlocksValue(
        propValue,
        blocks,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock
      );
    case BLOCK_PROPS_CONFIG_TYPES.componentReference:
      return parseMappedBlockPropComponentImportValue(
        propValue,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock,
        blockKey
      );
    default:
      return propValue;
  }
}

export function getPropValueFromRepeaterData(prop: RepeaterDataPropModel, fieldKey: string): any {
  const index = 0;
  const itemKey = get(prop, `data.order[${index}]`, '');
  return get(prop, `data.items[${itemKey}].values[${fieldKey}].value`, '');
}

export function parseMappedBlockPropLinkedValue(
  prop: BlockPropModel,
  blocks: BlocksModel,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  originalBlockKey: string
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
    finalPropValue = getPropValueFromRepeaterData(propValue, repeaterFieldKey);
  }
  return parsePropValue(
    finalPropValue,
    propType,
    blocks,
    styles,
    parsedProps,
    components,
    mappedBlockToBlock,
    originalBlockKey
  );
}

export function parseMappedBlockPropValue(
  prop: BlockPropModel | null,
  blocks: BlocksModel,
  propConfig: BlockPropConfigModel | null,
  styles: StylesModels,
  parsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement,
  blockKey: string
): any {
  if (!prop) {
    if (propConfig && propConfig.defaultValue) {
      return propConfig.defaultValue;
    }
    return null;
  }
  if (prop.linked) {
    return parseMappedBlockPropLinkedValue(
      prop,
      blocks,
      styles,
      parsedProps,
      components,
      mappedBlockToBlock,
      blockKey
    );
  }
  if (!propConfig) {
    return prop.value;
  }
  return parsePropValue(
    prop.value,
    propConfig.type,
    blocks,
    styles,
    parsedProps,
    components,
    mappedBlockToBlock,
    blockKey
  );
}

export function parseMappedBlockPropsValues(
  block: BlockModel,
  blocks: BlocksModel,
  styles: StylesModels,
  allParsedProps: MappedBlockParsedPropsModel,
  components: ComponentsModels,
  mappedBlockToBlock: MappedBlockToBlockReplacement
): MappedBlockPropsModel {
  const blockKey = getBlockKey(block);
  const availablePropKeys = getAvailablePropKeysFromBlock(block);
  const availableOtherPropKeys = [];
  const availableChildrenPropKeys = [];
  availablePropKeys.forEach(propKey => {
    const propConfig = getMergedPropConfigFromBlock(propKey, block);
    if (isPropConfigBlockType(propConfig) || isPropConfigComponentReferenceType(propConfig)) {
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
        blocks,
        propConfig,
        styles,
        allParsedProps,
        components,
        mappedBlockToBlock,
        blockKey
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
        blocks,
        propConfig,
        styles,
        parsedProps,
        components,
        mappedBlockToBlock,
        blockKey
      ),
      type: propConfig && propConfig.type ? propConfig.type : BLOCK_PROPS_CONFIG_TYPES.string,
    };
  });
  return {
    ...parsedOtherProps,
    ...parsedChildrenProps,
  };
}
