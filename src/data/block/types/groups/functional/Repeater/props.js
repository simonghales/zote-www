// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';
import { CHILDREN_PROP_CONFIG, REPEATER_DATA_PROP_CONFIG } from '../../../../props/data';
import type { RepeaterDataPropModel } from '../../../../props/types/model';

export const defaultRepeaterDataPropsValue: RepeaterDataPropModel = {
  model: {
    fields: {},
  },
  data: {
    order: [],
    items: {},
  },
};

export const repeaterPropsConfig: BlockPropsConfigModel = {
  [CHILDREN_PROP_CONFIG.key]: {
    ...CHILDREN_PROP_CONFIG,
  },
  [REPEATER_DATA_PROP_CONFIG.key]: {
    ...REPEATER_DATA_PROP_CONFIG,
    defaultValue: defaultRepeaterDataPropsValue,
  },
};
