// @flow

import type { BlockPropsConfigModel } from '../props/model';

export type BlockTypeModel = {
  key: string,
  name: string,
  component: any, // React Component
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
