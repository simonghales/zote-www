// @flow

import type { BlockPropModel } from './model';

export function updatePropLinked(
  prop: BlockPropModel,
  blockKey: string,
  propKey: string
): BlockPropModel {
  return {
    ...prop,
    linked: {
      blockKey,
      propKey,
    },
  };
}

export function updatePropValue(prop: BlockPropModel, propValue: any): BlockPropModel {
  return {
    ...prop,
    value: propValue,
  };
}
