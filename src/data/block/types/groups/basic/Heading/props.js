// @flow

import type { BlockPropsConfigModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES, BLOCK_PROPS_DISPLAY_SECTIONS } from '../../../../props/model';

export const headingPropsConfig: BlockPropsConfigModel = {
  element: {
    key: 'element',
    label: 'Element',
    type: BLOCK_PROPS_CONFIG_TYPES.html,
    displaySection: BLOCK_PROPS_DISPLAY_SECTIONS.html,
    defaultValue: 'p',
  },
  text: {
    key: 'text',
    label: 'Text',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
    defaultValue: '',
  },
};
