// @flow

export type HtmlAttributeEntryModel = {
  key: string,
  value: any,
};

export type HtmlAttributesPropValue = Array<HtmlAttributeEntryModel>;

export type RepeaterDataPropModelFieldModel = {
  key: string,
  label: string,
  type: string,
};

export type RepeaterDataPropModelModel = {
  fields: {
    [string]: RepeaterDataPropModelFieldModel,
  },
};

export type RepeaterDataPropDataItemValueModel = {
  value: any,
};

export type RepeaterDataPropDataItemValuesModel = {
  [string]: RepeaterDataPropDataItemValueModel,
};

export type RepeaterDataPropDataItemModel = {
  key: string,
  values: {
    [string]: any,
  },
};

export type RepeaterDataPropDataModel = {
  order: Array<string>,
  items: {
    [string]: RepeaterDataPropDataItemModel,
  },
};

export type RepeaterDataPropModel = {
  model: RepeaterDataPropModelModel,
  data: RepeaterDataPropDataModel,
};
