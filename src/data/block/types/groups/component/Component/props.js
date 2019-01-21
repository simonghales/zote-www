// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';

export const componentPropsConfig: BlockPropsConfigModel = {
  children: {
    key: 'children',
    label: '',
    type: BLOCK_PROPS_CONFIG_TYPES.blocks,
    defaultValue: null,
  },
};
