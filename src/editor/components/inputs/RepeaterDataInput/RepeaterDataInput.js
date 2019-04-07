// @flow
import React from 'react';
import RepeaterModel from './components/RepeaterModel/RepeaterModel';
import RepeaterData from './components/RepeaterData/RepeaterData';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import type { RepeaterDataPropModel } from '../../../../data/block/props/types/model';

type Props = DefaultFormInputProps & {
  value: RepeaterDataPropModel,
  defaultValue: RepeaterDataPropModel,
};

const RepeaterDataInput = ({ value, defaultValue }: Props) => {
  const usedValue: RepeaterDataPropModel = value || defaultValue;
  return (
    <section>
      <RepeaterModel model={usedValue.model} />
      <RepeaterData data={usedValue.data} model={usedValue.model} />
    </section>
  );
};

export default RepeaterDataInput;
