// @flow

import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigModel,
  BlockPropsConfigTypes,
  BlockPropsModel,
} from './model';
import { BLOCK_PROPS_CONFIG_TYPES } from './model';
import { isValueDefined } from '../../../utils/validation';

export function getPropConfigFromPropsConfig(
  propKey: string,
  propsConfig: BlockPropsConfigModel
): BlockPropConfigModel | null {
  return propsConfig[propKey] ? propsConfig[propKey] : null;
}

export type ParsedPropBlocksValue = Array<string>;

export function parsePropBlocksValue(value: any): ParsedPropBlocksValue {
  if (value instanceof Array) {
    return value;
  }
  console.warn(`Value "${typeof value}" is not an array, expected an array.`);
  return [];
}

export type ParsedPropValues = string | ParsedPropBlocksValue | null;

export function parsePropValue(
  prop: BlockPropModel,
  propType: BlockPropsConfigTypes
): ParsedPropValues {
  switch (propType) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
      return parsePropBlocksValue(prop.value);
    default:
      return prop.value;
  }
}

export function getPropFromProps(propKey: string, props: BlockPropsModel): BlockPropModel | null {
  return props[propKey] ? props[propKey] : null;
}

export function getSortingPriorityFromPropConfig(propConfig: BlockPropConfigModel): number {
  return propConfig.sortingPriority ? propConfig.sortingPriority : 0;
}

export function isPropCustom(propConfig: BlockPropConfigModel): boolean {
  return !!propConfig.customProp;
}

export function isPropEditable(propConfig: BlockPropConfigModel): boolean {
  return !!propConfig.editable;
}

export function isPropDeletable(propConfig: BlockPropConfigModel): boolean {
  return !!propConfig.deletable;
}

export function isPropLinkable(propConfig: BlockPropConfigModel): boolean {
  return !!propConfig.linkable;
}

export function getNameFromPropConfig(propConfig: BlockPropConfigModel): string {
  return propConfig.label ? propConfig.label : propConfig.key;
}

export function getTypeFromPropConfig(propConfig: BlockPropConfigModel): string {
  return propConfig.type;
}
