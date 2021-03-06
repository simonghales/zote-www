// @flow
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import SelectInput from '../../../../../SelectInput/SelectInput';
import { PROP_TYPES_OPTIONS } from '../../../../../SelectInput/data';
import { RoundIconButton } from '../../../../../../Button/Button';

const defaultPropType = PROP_TYPES_OPTIONS[0].value;

type Props = {
  label: string,
  type: string,
  update: (label: string, type: string) => void,
  remove: () => void,
};

const RepeaterModelInput = ({ label, type, update, remove }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <Input
        value={label}
        theme={INPUT_THEMES.plain}
        onChangeString={value => {
          update(value, type);
        }}
      />
    </div>
    <div className={styles.typeClass}>
      <SelectInput
        value={type}
        options={PROP_TYPES_OPTIONS}
        defaultValue={defaultPropType}
        updateValue={value => {
          update(label, value);
        }}
        isCreatable={false}
        isMulti={false}
        inputId=""
      />
    </div>
    <div className={styles.deleteClass}>
      <RoundIconButton onClick={remove}>
        <FaTrash size={11} />
      </RoundIconButton>
    </div>
  </div>
);

export default RepeaterModelInput;
