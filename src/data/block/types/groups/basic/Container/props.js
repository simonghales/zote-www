// @flow
import type { Node } from 'react';
import type { BlockPropsConfigModel } from '../../../../props/model';
import {
  ELEMENT_PROP_CONFIG,
  CHILDREN_PROP_CONFIG,
  HTML_ATTRIBUTES_PROP_CONFIG
} from '../../../../props/data';

export const containerPropsConfig: BlockPropsConfigModel = {
  [ELEMENT_PROP_CONFIG.key]: {
    ...ELEMENT_PROP_CONFIG,
  },
  [CHILDREN_PROP_CONFIG.key]: {
    ...CHILDREN_PROP_CONFIG,
  },
  [HTML_ATTRIBUTES_PROP_CONFIG.key]: {
    ...HTML_ATTRIBUTES_PROP_CONFIG,
  },
};
