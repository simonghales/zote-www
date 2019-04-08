// @flow
import React from 'react';
import RepeaterModel from './components/RepeaterModel/RepeaterModel';
import RepeaterData from './components/RepeaterData/RepeaterData';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import type { RepeaterDataPropModel } from '../../../../data/block/props/types/model';
import {
  addNewDataItemToRepeaterData,
  addNewFieldToRepeaterDataModel,
  removeDataItemFromRepeaterData,
  removeFieldFromRepeaterDataModel,
  updateDataItemInRepeaterData,
  updateDataItemPositionInRepeaterData,
  updateRepeaterDataModelField,
} from '../../../../data/block/props/types/modifiers';

type Props = DefaultFormInputProps & {
  value: RepeaterDataPropModel,
  defaultValue: RepeaterDataPropModel,
};

const RepeaterDataInput = ({ value, defaultValue, updateValue }: Props) => {
  const usedValue: RepeaterDataPropModel = value || defaultValue;

  const updateField = (fieldKey: string, fieldLabel: string, fieldType: string) => {
    const updatedValue = updateRepeaterDataModelField(usedValue, fieldKey, fieldLabel, fieldType);
    updateValue(updatedValue);
  };

  const createField = () => {
    const updatedValue = addNewFieldToRepeaterDataModel(usedValue);
    updateValue(updatedValue);
  };

  const removeField = (fieldKey: string) => {
    const updatedValue = removeFieldFromRepeaterDataModel(usedValue, fieldKey);
    updateValue(updatedValue);
  };

  const updateDataItem = (itemKey: string, fieldKey: string, newValue: any) => {
    const updatedValue = updateDataItemInRepeaterData(usedValue, itemKey, fieldKey, newValue);
    updateValue(updatedValue);
  };

  const removeDataItem = (itemKey: string) => {
    const updatedValue = removeDataItemFromRepeaterData(usedValue, itemKey);
    updateValue(updatedValue);
  };

  const addDataItem = (position: number) => {
    const updatedValue = addNewDataItemToRepeaterData(usedValue, position);
    updateValue(updatedValue);
  };

  const updateDataItemPosition = (itemKey: string, position: number) => {
    const updatedValue = updateDataItemPositionInRepeaterData(usedValue, itemKey, position);
    updateValue(updatedValue);
  };

  return (
    <section>
      <RepeaterModel
        model={usedValue.model}
        updateField={updateField}
        createField={createField}
        removeField={removeField}
      />
      <RepeaterData
        data={usedValue.data}
        model={usedValue.model}
        updateDataItem={updateDataItem}
        removeDataItem={removeDataItem}
        updateDataItemPosition={updateDataItemPosition}
        addDataItem={addDataItem}
      />
    </section>
  );
};

export default RepeaterDataInput;
