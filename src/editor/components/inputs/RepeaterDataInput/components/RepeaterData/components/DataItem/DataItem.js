// @flow
import React from 'react';
import { get } from 'lodash';
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import { RoundIconButton, SlimIconButton } from '../../../../../../Button/Button';
import type {
  RepeaterDataPropDataItemValuesModel,
  RepeaterDataPropModelModel,
} from '../../../../../../../../data/block/props/types/model';

type AddDataItemButtonProps = {
  add: () => void,
};

export const AddDataItemButton = ({ add }: AddDataItemButtonProps) => (
  <SlimIconButton icon={<FaPlus size={9} />} onClick={add}>
    Add Item
  </SlimIconButton>
);

type DataItemInputProps = {
  label: string,
  value: any,
  update: (value: any) => void,
};

const DataItemInput = ({ label, value, update }: DataItemInputProps) => (
  <div className={styles.inputContainerClass}>
    <label className={styles.inputLabelClass}>{label}</label>
    <div>
      <Input value={value} theme={INPUT_THEMES.plain} onChangeString={update} />
    </div>
  </div>
);

const getLabelFromModel = (fieldKey: string, model: RepeaterDataPropModelModel): string =>
  get(model, `fields[${fieldKey}].label`, fieldKey);

const getValueFromValues = (fieldKey: string, values: RepeaterDataPropDataItemValuesModel): any =>
  get(values, `${fieldKey}.value`, '');

type Props = {
  index: number,
  values: RepeaterDataPropDataItemValuesModel,
  model: RepeaterDataPropModelModel,
  update: (fieldKey: string, newValue: any) => void,
  remove: () => void,
  addDataItem: (position: number) => void,
};

const DataItem = ({ index, values, model, update, remove, addDataItem }: Props) => (
  <div className={styles.containerClass}>
    {Object.keys(model.fields).map(fieldKey => (
      <DataItemInput
        label={getLabelFromModel(fieldKey, model)}
        value={getValueFromValues(fieldKey, values)}
        key={fieldKey}
        update={(value: any) => {
          update(fieldKey, value);
        }}
      />
    ))}
    <div className={styles.optionsClass}>
      <div className={styles.directionOptionsClass}>
        <RoundIconButton onClick={() => {}}>
          <FaArrowUp size={11} />
        </RoundIconButton>
        <RoundIconButton onClick={() => {}}>
          <FaArrowDown size={11} />
        </RoundIconButton>
      </div>
      <div>
        <RoundIconButton onClick={remove}>
          <FaTrash size={11} />
        </RoundIconButton>
      </div>
    </div>
    <footer className={styles.footerClass}>
      <AddDataItemButton
        add={() => {
          addDataItem(index + 1);
        }}
      />
    </footer>
  </div>
);

export default DataItem;
