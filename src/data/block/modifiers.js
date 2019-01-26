// @flow

import type { BlockModel } from './model';
import { getPropsConfigFromBlock, getPropsFromBlock } from './state';
import { updatePropValue } from './props/modifiers';
import { getPropFromProps } from './props/state';
import { generateDefaultPropObject, generateNewPropConfig } from './props/generators';
import type { BlockPropsConfigTypes } from './props/model';

export function updateBlockPropValue(
  block: BlockModel,
  propKey: string,
  propValue: any
): BlockModel {
  const props = getPropsFromBlock(block);
  let prop = getPropFromProps(propKey, props);
  if (!prop) {
    prop = generateDefaultPropObject(propKey);
  }
  return {
    ...block,
    props: {
      ...props,
      [propKey]: updatePropValue(prop, propValue),
    },
  };
}

export function addNewPropToBlock(
  block: BlockModel,
  propKey: string,
  propType: BlockPropsConfigTypes,
  propLabel: string
): BlockModel {
  const propsConfig = getPropsConfigFromBlock(block);
  return {
    ...block,
    propsConfig: {
      ...propsConfig,
      [propKey]: generateNewPropConfig(propKey, propType, propLabel),
    },
  };
}
