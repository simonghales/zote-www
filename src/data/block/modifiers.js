// @flow

import type { BlockModel } from './model';
import { getBlockChildrenKeysFromBlock, getPropsConfigFromBlock, getPropsFromBlock } from './state';
import { removePropLinked, updatePropLinked, updatePropValue } from './props/modifiers';
import { getPropFromProps } from './props/state';
import { generateDefaultPropObject, generateNewPropConfig } from './props/generators';
import type { BlockPropsConfigTypes } from './props/model';
import { updateBlockChildrenKeys } from '../component/modifiers';

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
  selectedPropKey: string,
  fieldKey?: string
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
      [propKey]: updatePropLinked(prop, selectedBlockKey, selectedPropKey, fieldKey),
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

export function addBlockToBlockChildrenKeys(
  blockKey: string,
  blockChildrenKeys: Array<string>,
  targetIndex: number
): Array<string> {
  const updatedKeys = blockChildrenKeys.slice();
  updatedKeys.splice(targetIndex, 0, blockKey);
  return updatedKeys;
}

export function addBlockKeysToBlockChildrenKeys(
  blockKeys: Array<string>,
  blockChildrenKeys: Array<string>,
  targetIndex: number
): Array<string> {
  const updatedKeys = blockChildrenKeys.slice();
  updatedKeys.splice(targetIndex, 0, ...blockKeys);
  return updatedKeys;
}

export function removeBlockFromBlockChildren(block: BlockModel, blockKey: string): BlockModel {
  const childrenKeys = getBlockChildrenKeysFromBlock(block).slice();
  const blockIndex = childrenKeys.indexOf(blockKey);
  if (blockIndex < 0) {
    return block;
  }
  childrenKeys.splice(blockIndex, 1);
  return updateBlockChildrenKeys(block, childrenKeys);
}

export function addBlocksToBlockChildren(
  block: BlockModel,
  blockKeys: Array<string>,
  targetIndex: number
): BlockModel {
  const childrenKeys = getBlockChildrenKeysFromBlock(block).slice();
  return updateBlockChildrenKeys(
    block,
    addBlockKeysToBlockChildrenKeys(childrenKeys, blockKeys, targetIndex)
  );
}

export function updateBlockName(block: BlockModel, name: string): BlockModel {
  return {
    ...block,
    name,
  };
}
