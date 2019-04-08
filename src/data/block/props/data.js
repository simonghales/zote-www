// @flow

import { BLOCK_PROPS_CONFIG_TYPES, BLOCK_PROPS_DISPLAY_SECTIONS } from './model';
import type { BlockPropConfigModel } from './model';

export const REPEATER_DATA_PROP_CONFIG: BlockPropConfigModel = {
  key: 'repeaterData',
  label: 'Repeater',
  type: BLOCK_PROPS_CONFIG_TYPES.repeaterData,
  defaultValue: null,
};

export const CHILDREN_PROP_CONFIG: BlockPropConfigModel = {
  key: 'children',
  label: '',
  hidden: true,
  type: BLOCK_PROPS_CONFIG_TYPES.blocks,
  defaultValue: null,
};

export const ELEMENT_PROP_CONFIG: BlockPropConfigModel = {
  key: 'element',
  label: 'Element',
  type: BLOCK_PROPS_CONFIG_TYPES.html,
  displaySection: BLOCK_PROPS_DISPLAY_SECTIONS.html,
  defaultValue: 'div',
};

export const HTML_ATTRIBUTES_PROP_CONFIG: BlockPropConfigModel = {
  key: 'htmlAttributes',
  label: 'HTML Attributes',
  type: BLOCK_PROPS_CONFIG_TYPES.htmlAttributes,
  displaySection: BLOCK_PROPS_DISPLAY_SECTIONS.html,
  defaultValue: [],
  sortingPriority: 50,
};
