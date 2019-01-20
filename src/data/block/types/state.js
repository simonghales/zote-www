// @flow

import type { BlockTypeModel } from './model';
import type { BlockPropsConfigModel } from '../props/model';

export function getPropsConfigFromBlockType(blockType: BlockTypeModel): BlockPropsConfigModel {
  const { propsConfig = {} } = blockType;
  return propsConfig;
}
