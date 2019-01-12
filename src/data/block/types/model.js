// @flow

import type { BlockPropsConfigModel, BlockPropsModel } from '../props/model';

export type BlockTypeModel = {
  key: string,
  name: string,
  component: any, // React Component
  defaultProps: BlockPropsModel,
  propsConfig: BlockPropsConfigModel,
  propsEnabled: boolean,
  stylesEnabled: boolean,
  htmlEnabled: boolean,
};

export type BlockTypesGroupModel = {
  key: string,
  name: string,
  blockTypes: Array<string>,
};
