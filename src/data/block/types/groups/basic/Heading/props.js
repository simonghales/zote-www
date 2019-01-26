// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';
import {ELEMENT_PROP_CONFIG, HTML_ATTRIBUTES_PROP_CONFIG} from '../../../../props/data';

export const headingPropsConfig: BlockPropsConfigModel = {
  [ELEMENT_PROP_CONFIG.key]: {
    ...ELEMENT_PROP_CONFIG,
    defaultValue: 'h3',
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
