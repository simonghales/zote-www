// @flow

import type { BlockPropsConfigModel, BlockPropsModel } from '../../../../props/model';
import { BLOCK_PROPS_CONFIG_TYPES, BLOCK_PROPS_DISPLAY_SECTIONS } from '../../../../props/model';

export const containerDefaultProps: BlockPropsModel = {
  element: {
    key: 'element',
    value: 'div',
  },
  children: {
    key: 'children',
    value: null,
  },
};

export const containerPropsConfig: BlockPropsConfigModel = {
  element: {
    key: 'element',
    label: 'Element',
    type: BLOCK_PROPS_CONFIG_TYPES.html,
    displaySection: BLOCK_PROPS_DISPLAY_SECTIONS.html,
  },
  children: {
    key: 'children',
    label: '',
    type: BLOCK_PROPS_CONFIG_TYPES.blocks,
  },
};
