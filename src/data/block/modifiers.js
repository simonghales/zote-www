// @flow

import type { BlockModel } from './model';
import { getPropsConfigFromBlock, getPropsFromBlock } from './state';
import { removePropLinked, updatePropLinked, updatePropValue } from './props/modifiers';
import { getPropFromProps } from './props/state';
import { generateDefaultPropObject, generateNewPropConfig } from './props/generators';
import type { BlockPropsConfigTypes } from './props/model';

export function updateBlockPropRemoveLink(block: BlockModel, propKey: string): BlockModel {
  const props = getPropsFromBlock(block);
  let prop = getPropFromProps(propKey, props);
  if (!prop) {
    prop = generateDefaultPropObject(propKey);
  }
  return {
    ...block,
    props: {
      ...props,
      [propKey]: removePropLinked(prop),
    },
  };
}

export function updateBlockPropLinked(
  block: BlockModel,
  propKey: string,
  selectedBlockKey: string,
  selectedPropKey: string
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
      [propKey]: updatePropLinked(prop, selectedBlockKey, selectedPropKey),
    },
  };
}

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

export function updateBlockPropConfig(
  block: BlockModel,
  propKey: string,
  updatedPropKey: string,
  updatedPropType: BlockPropsConfigTypes,
  updatedPropLabel: string
): BlockModel {
  const propsConfig = getPropsConfigFromBlock(block);
  const propConfig = propsConfig[propKey];
  // todo - maybe use updatedPropKey in the future
  return {
    ...block,
    propsConfig: {
      ...propsConfig,
      [propKey]: {
        ...propConfig,
        label: updatedPropLabel,
        type: updatedPropType,
      },
    },
  };
}
