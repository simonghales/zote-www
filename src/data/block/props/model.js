// @flow

export const COMMON_PROPS = {
  children: 'children',
};

export type BlockPropModel = {
  key: string,
  value: any,
  linked?: {
    blockKey: string,
    propKey: string,
  },
  variable?: {
    variableKey: string,
  },
};

export type BlockPropsModel = {
  [string]: BlockPropModel,
};

export const BLOCK_PROPS_CONFIG_TYPES = {
  string: 'string',
  html: 'html',
  module: 'module',
  blocks: 'blocks',
  htmlAttribute: 'htmlAttribute',
  propReference: 'propReference',
  repeaterData: 'repeaterData',
};

export type BlockPropsConfigTypes = $Keys<typeof BLOCK_PROPS_CONFIG_TYPES>;

export const BLOCK_PROPS_DISPLAY_SECTIONS = {
  props: 'props',
  html: 'html',
};

export type BlockPropsDisplaySections = $Keys<typeof BLOCK_PROPS_DISPLAY_SECTIONS>;

export type BlockPropConfigModel = {
  key: string,
  type: BlockPropsConfigTypes,
  label?: string,
  hidden?: boolean,
  displaySection?: BlockPropsDisplaySections,
  defaultValue?: any,
};

export type BlockPropsConfigModel = {
  [string]: BlockPropConfigModel,
};
