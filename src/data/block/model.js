// @flow

import type { BlockPropsConfigModel, BlockPropsModel } from './props/model';

export type BlockModel = {
  key: string,
  blockTypeKey: string,
  name: string,
  props?: BlockPropsModel,
  propsConfig?: BlockPropsConfigModel,
  styles?: {
    stylesKey: string,
  },
  isRootBlock?: boolean,
};
