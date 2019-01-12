// @flow

import type { BlockModel } from '../block/model';

export type ComponentModel = {
  key: string,
  blocks: {
    [string]: BlockModel,
  },
  rootBlockKey: string,
};

export type ModuleComponentModel = {
  key: string,
  componentKey: string,
};
