// @flow

import type { BlocksModel } from '../block/model';

export type ComponentModel = {
  key: string,
  blocks: BlocksModel,
  rootBlockKey: string,
};

export type ModuleComponentModel = {
  key: string,
  componentKey: string,
};

export type ComponentsModels = {
  [string]: ComponentModel,
};
