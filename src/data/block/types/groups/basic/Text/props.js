// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';
import { ELEMENT_PROP_CONFIG, HTML_ATTRIBUTES_PROP_CONFIG } from '../../../../props/data';

export const textPropsConfig: BlockPropsConfigModel = {
  [ELEMENT_PROP_CONFIG.key]: {
    ...ELEMENT_PROP_CONFIG,
    hidden: true,
    defaultValue: 'p',
  },
  text: {
    key: 'text',
    label: 'Text',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
    defaultValue: '',
  },
  [HTML_ATTRIBUTES_PROP_CONFIG.key]: {
    ...HTML_ATTRIBUTES_PROP_CONFIG,
  },
};
