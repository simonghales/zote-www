// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';
import {
  CHILDREN_PROP_CONFIG,
  ELEMENT_PROP_CONFIG,
  HTML_ATTRIBUTES_PROP_CONFIG,
} from '../../../../props/data';

export const htmlElementPropsConfig: BlockPropsConfigModel = {
  [ELEMENT_PROP_CONFIG.key]: {
    ...ELEMENT_PROP_CONFIG,
    defaultValue: 'div',
  },
  content: {
    key: 'content',
    label: 'Content',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
    defaultValue: '',
    linkable: true,
  },
  [CHILDREN_PROP_CONFIG.key]: {
    ...CHILDREN_PROP_CONFIG,
  },
  [HTML_ATTRIBUTES_PROP_CONFIG.key]: {
    ...HTML_ATTRIBUTES_PROP_CONFIG,
  },
};
