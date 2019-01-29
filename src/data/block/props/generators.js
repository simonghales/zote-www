// @flow

import type { BlockPropConfigModel, BlockPropModel, BlockPropsConfigTypes } from './model';
import { getPropKey } from '../../../utils/string';

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
    customProp: true,
    editable: true,
    deletable: true,
  };
}

export function generatePropKeyFromPropLabel(
  propLabel: string,
  propKeys: Array<string> = []
): string {
  const propKey = getPropKey(propLabel);
  if (!propKeys.includes(propKey)) {
    return propKey;
  }
  for (let i = 0, len = 100; i < len; i++) {
    const iteratedPropKey = getPropKey(`${propLabel}${i.toString()}`);
    if (!propKeys.includes(iteratedPropKey)) {
      return iteratedPropKey;
    }
  }
  throw new Error(`Unable to generate prop key from prop label "${propLabel}"`);
}
