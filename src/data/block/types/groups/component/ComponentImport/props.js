// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';

export const componentImportPropsConfig: BlockPropsConfigModel = {
  componentReference: {
    key: 'componentReference',
    label: '',
    hidden: true,
    type: BLOCK_PROPS_CONFIG_TYPES.componentReference,
    defaultValue: '',
  },
};
