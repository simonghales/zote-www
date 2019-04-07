// @flow
import React from 'react';
import { get } from 'lodash';
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import { RoundIconButton, SlimIconButton } from '../../../../../../Button/Button';
import type {
  RepeaterDataPropDataItemValueModel,
  RepeaterDataPropDataItemValuesModel,
  RepeaterDataPropModelModel,
} from '../../../../../../../../data/block/props/types/model';

type DataItemInputProps = {
  label: string,
  value: any,
};

const getValue = (value: RepeaterDataPropDataItemValueModel): any => get(value, 'value', '');

const DataItemInput = ({ label, value }: DataItemInputProps) => (
  <div className={styles.inputContainerClass}>
    <label className={styles.inputLabelClass}>{label}</label>
    <div>
      <Input value={value} theme={INPUT_THEMES.plain} />
    </div>
  </div>
);

const getLabelFromModel = (fieldKey: string, model: RepeaterDataPropModelModel): string =>
  get(model, `fields[${fieldKey}].label`, fieldKey);

type Props = {
  index: number,
  values: RepeaterDataPropDataItemValuesModel,
  model: RepeaterDataPropModelModel,
};

const DataItem = ({ index, values, model }: Props) => {
  const AddButton = () => (
    <SlimIconButton icon={<FaPlus size={9} />} onClick={() => {}}>
      Add Item
    </SlimIconButton>
  );

  return (
    <div className={styles.containerClass}>
      {index === 0 && (
        <header className={styles.headerClass}>
          <AddButton />
        </header>
      )}
      {Object.keys(values).map(valueKey => {
        const value = values[valueKey];
        return (
          <DataItemInput
            label={getLabelFromModel(valueKey, model)}
            value={getValue(value)}
            key={valueKey}
          />
        );
      })}
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
          <RoundIconButton onClick={() => {}}>
            <FaTrash size={11} />
          </RoundIconButton>
        </div>
      </div>
      <footer className={styles.footerClass}>
        <AddButton />
      </footer>
    </div>
  );
};

export default DataItem;
