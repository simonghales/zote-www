// @flow

import type { BlocksModel } from '../block/model';

export type ComponentModel = {
  key: string,
  blocks: BlocksModel,
  rootBlockKey: string,
  isReusable?: boolean,
};

export type ModuleComponentModel = {
  key: string,
  componentKey: string,
};

export type ComponentsModels = {
  [string]: ComponentModel,
};
