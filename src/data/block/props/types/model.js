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

export type RepeaterDataPropDataItemsModel = {
  [string]: RepeaterDataPropDataItemModel,
};

export type RepeaterDataPropDataModel = {
  order: Array<string>,
  items: RepeaterDataPropDataItemsModel,
};

export type RepeaterDataPropModel = {
  model: RepeaterDataPropModelModel,
  data: RepeaterDataPropDataModel,
};
