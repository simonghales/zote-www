// @flow

import type { BlockModel } from './model';
import { getPropsFromBlock } from './state';
import { updatePropValue } from './props/modifiers';
import { getPropFromProps } from './props/state';
import { generateDefaultPropObject } from './props/generators';

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
