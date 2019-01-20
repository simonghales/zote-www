// @flow

import type { BlockPropModel } from './model';

export function generateDefaultPropObject(propKey: string): BlockPropModel {
  return {
    key: propKey,
    value: null,
  };
}
