// @flow

import move from 'lodash-move';
import type {
  RepeaterDataPropDataItemModel,
  RepeaterDataPropModel,
  RepeaterDataPropModelFieldModel,
} from './model';
import { generateRepeaterDataItem, generateRepeaterDataModelFieldKey } from '../../keys';
import { BLOCK_PROPS_CONFIG_TYPES } from '../model';

function updateRepeaterModelField(
  key: string,
  label: string,
  type: string
): RepeaterDataPropModelFieldModel {
  return {
    key,
    label,
    type,
  };
}

function generateNewRepeaterModelField(): RepeaterDataPropModelFieldModel {
  return {
    key: generateRepeaterDataModelFieldKey(),
    label: '',
    type: BLOCK_PROPS_CONFIG_TYPES.string,
  };
}

export function updateRepeaterDataModelField(
  repeaterData: RepeaterDataPropModel,
  fieldKey: string,
  fieldLabel: string,
  fieldType: string
): RepeaterDataPropModel {
  const { model } = repeaterData;
  const { fields } = model;
  return {
    ...repeaterData,
    model: {
      ...model,
      fields: {
        ...fields,
        [fieldKey]: updateRepeaterModelField(fieldKey, fieldLabel, fieldType),
      },
    },
  };
}

export function addNewFieldToRepeaterDataModel(
  repeaterData: RepeaterDataPropModel
): RepeaterDataPropModel {
  const { model } = repeaterData;
  const { fields } = model;
  const newField = generateNewRepeaterModelField();
  return {
    ...repeaterData,
    model: {
      ...model,
      fields: {
        ...fields,
        [newField.key]: newField,
      },
    },
  };
}

function removeFieldDataFromRepeaterDataItem(
  dataItem: RepeaterDataPropDataItemModel,
  fieldKey: string
): RepeaterDataPropDataItemModel {
  const updatedValues = {};
  Object.keys(dataItem.values).forEach(valueKey => {
    if (valueKey !== fieldKey) {
      updatedValues[valueKey] = dataItem.values[valueKey];
    }
  });
  return {
    ...dataItem,
    values: updatedValues,
  };
}

export function removeFieldFromRepeaterDataModel(
  repeaterData: RepeaterDataPropModel,
  fieldToDeleteKey: string
): RepeaterDataPropModel {
  const { model } = repeaterData;
  const { fields } = model;
  const updatedFields = {};
  Object.keys(fields).forEach(fieldKey => {
    if (fieldKey !== fieldToDeleteKey) {
      updatedFields[fieldKey] = fields[fieldKey];
    }
  });
  const { data } = repeaterData;
  const { items } = data;
  const updatedDataItems = {};
  Object.keys(items).forEach(itemKey => {
    updatedDataItems[itemKey] = removeFieldDataFromRepeaterDataItem(
      items[itemKey],
      fieldToDeleteKey
    );
  });
  return {
    ...repeaterData,
    model: {
      ...model,
      fields: updatedFields,
    },
    data: {
      ...data,
      items: updatedDataItems,
    },
  };
}

export function updateRepeaterDataItem(
  dataItem: RepeaterDataPropDataItemModel,
  fieldKey: string,
  value: any
): RepeaterDataPropDataItemModel {
  return {
    ...dataItem,
    values: {
      ...dataItem.values,
      [fieldKey]: {
        value,
      },
    },
  };
}

export function updateDataItemInRepeaterData(
  repeaterData: RepeaterDataPropModel,
  itemKey: string,
  fieldKey: string,
  value: any
): RepeaterDataPropModel {
  const { data } = repeaterData;
  const { items } = data;
  return {
    ...repeaterData,
    data: {
      ...data,
      items: {
        ...items,
        [itemKey]: updateRepeaterDataItem(items[itemKey], fieldKey, value),
      },
    },
  };
}

export function removeDataItemFromRepeaterData(
  repeaterData: RepeaterDataPropModel,
  itemToRemoveKey: string
): RepeaterDataPropModel {
  const { data } = repeaterData;
  const { items, order } = data;
  const updatedItems = {};
  Object.keys(items).forEach(itemKey => {
    if (itemKey !== itemToRemoveKey) {
      updatedItems[itemKey] = items[itemKey];
    }
  });
  const orderIndex = order.indexOf(itemToRemoveKey);
  const updatedOrder = order.slice();
  updatedOrder.splice(orderIndex, 1);
  return {
    ...repeaterData,
    data: {
      ...data,
      order: updatedOrder,
      items: updatedItems,
    },
  };
}

function generateNewDataItem(): RepeaterDataPropDataItemModel {
  return {
    key: generateRepeaterDataItem(),
    values: {},
  };
}

export function addNewDataItemToRepeaterData(
  repeaterData: RepeaterDataPropModel,
  position: number
): RepeaterDataPropModel {
  const { data } = repeaterData;
  const { items, order } = data;
  const newItem = generateNewDataItem();
  const updatedOrder = order.slice();
  updatedOrder.splice(position, 0, newItem.key);
  return {
    ...repeaterData,
    data: {
      ...data,
      order: updatedOrder,
      items: {
        ...items,
        [newItem.key]: newItem,
      },
    },
  };
}

export function updateDataItemPositionInRepeaterData(
  repeaterData: RepeaterDataPropModel,
  itemKey: string,
  newPosition: number
): RepeaterDataPropModel {
  const { data } = repeaterData;
  const { order } = data;
  let updatedOrder = order.slice();
  const originalPosition = updatedOrder.indexOf(itemKey);
  let finalPosition = newPosition;
  if (finalPosition < 0) {
    finalPosition = updatedOrder.length;
  } else if (finalPosition > updatedOrder.length - 1) {
    finalPosition = 0;
  }
  updatedOrder = move(updatedOrder, originalPosition, finalPosition);
  return {
    ...repeaterData,
    data: {
      ...data,
      order: updatedOrder,
    },
  };
}
