// @flow

import type { BlockPropModel } from './model';

export function removePropLinked(prop: BlockPropModel): BlockPropModel {
  return {
    ...prop,
    linked: null,
  };
}

export function updatePropLinked(
  prop: BlockPropModel,
  blockKey: string,
  propKey: string,
  fieldKey?: string
): BlockPropModel {
  return {
    ...prop,
    linked: {
      blockKey,
      propKey,
      repeaterFieldKey: fieldKey,
    },
  };
}

export function updatePropValue(prop: BlockPropModel, propValue: any): BlockPropModel {
  return {
    ...prop,
    value: propValue,
  };
}
