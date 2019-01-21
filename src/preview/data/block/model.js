// @flow

import type { BlockPropsConfigTypes } from '../../../data/block/props/model';

export type MappedBlockPropModel = {
  value: any,
  type: BlockPropsConfigTypes,
};

export type MappedBlockPropsModel = {
  [string]: MappedBlockPropModel,
};

export type MappedBlockStylesModel = {
  [string]: {
    [string]: string,
  },
};

export type MappedBlockModel = {
  key: string,
  blockTypeKey: string,
  props: MappedBlockPropsModel,
  styles: MappedBlockStylesModel,
};
