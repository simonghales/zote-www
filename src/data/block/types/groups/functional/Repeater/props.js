// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';
import { CHILDREN_PROP_CONFIG } from '../../../../props/data';

export const repeaterPropsConfig: BlockPropsConfigModel = {
  [CHILDREN_PROP_CONFIG.key]: {
    ...CHILDREN_PROP_CONFIG,
  },
  repeaterData: {
    key: 'repeaterData',
    label: 'Repeater',
    type: BLOCK_PROPS_CONFIG_TYPES.repeaterData,
    defaultValue: null,
  },
};
