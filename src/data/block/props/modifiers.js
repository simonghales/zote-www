// @flow

import type { BlockPropModel } from './model';

export function updatePropValue(prop: BlockPropModel, propValue: any): BlockPropModel {
  return {
    ...prop,
    value: propValue,
  };
}
