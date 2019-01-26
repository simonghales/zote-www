// @flow

import type { BlockPropConfigModel, BlockPropModel, BlockPropsConfigTypes } from './model';

export function generateDefaultPropObject(propKey: string): BlockPropModel {
  return {
    key: propKey,
    value: null,
  };
}

export function generateNewPropConfig(
  propKey: string,
  propType: BlockPropsConfigTypes,
  propLabel: string
): BlockPropConfigModel {
  return {
    key: propKey,
    type: propType,
    label: propLabel,
  };
}
