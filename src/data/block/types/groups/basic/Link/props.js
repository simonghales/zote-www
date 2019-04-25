// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { CHILDREN_PROP_CONFIG, HTML_ATTRIBUTES_PROP_CONFIG } from '../../../../props/data';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../props/model';

export const linkPropsConfig: BlockPropsConfigModel = {
  [CHILDREN_PROP_CONFIG.key]: {
    ...CHILDREN_PROP_CONFIG,
  },
  content: {
    key: 'content',
    label: 'Content',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
    defaultValue: '',
    linkable: true,
  },
  to: {
    key: 'to',
    label: 'To',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
    defaultValue: '',
  },
  [HTML_ATTRIBUTES_PROP_CONFIG.key]: {
    ...HTML_ATTRIBUTES_PROP_CONFIG,
  },
};
