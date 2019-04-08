// @flow

export type BlockPropLinkedModel = {
  blockKey: string,
  propKey: string,
  repeaterFieldKey?: string,
};

export type BlockPropModel = {
  key: string,
  value: any,
  linked?: BlockPropLinkedModel | null,
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
  htmlAttributes: 'htmlAttributes',
  propReference: 'propReference',
  repeaterData: 'repeaterData',
  componentReference: 'componentReference',
};

export const DEFAULT_PROP_CONFIG_TYPE = BLOCK_PROPS_CONFIG_TYPES.string;

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
  sortingPriority?: number,
  customProp?: boolean,
  editable?: boolean,
  deletable?: boolean,
  linkable?: boolean,
};

export type BlockPropsConfigModel = {
  [string]: BlockPropConfigModel,
};
