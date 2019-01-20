// @flow

import type {
  BlockPropConfigModel,
  BlockPropModel,
  BlockPropsConfigModel,
  BlockPropsConfigTypes,
  BlockPropsModel,
} from './model';
import { BLOCK_PROPS_CONFIG_TYPES } from './model';

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
