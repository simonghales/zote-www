// @flow
import type { Node } from 'react';
import type { BlockPropsConfigModel } from '../props/model';
import type { BlockModel } from '../model';

export type BlockTypeModel = {
  key: string,
  name: string,
  component: any, // React Component
  propsConfig: BlockPropsConfigModel,
  propsEnabled: boolean,
  stylesEnabled: boolean,
  htmlEnabled: boolean,
  addPropsEnabled: boolean,
  icon: Node,
  generate: (generateProps: {
    [string]: any,
  }) => BlockModel,
};

export type BlockTypesGroupModel = {
  key: string,
  name: string,
  blockTypes: Array<string>,
};
