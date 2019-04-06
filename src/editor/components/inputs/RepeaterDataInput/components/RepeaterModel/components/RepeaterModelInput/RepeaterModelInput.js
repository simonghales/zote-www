// @flow
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import SelectInput from '../../../../../SelectInput/SelectInput';
import { PROP_TYPES_OPTIONS } from '../../../../../SelectInput/data';
import { RoundIconButton } from '../../../../../../Button/Button';

const defaultPropType = PROP_TYPES_OPTIONS[0].value;

const RepeaterModelInput = () => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <Input value="Label" theme={INPUT_THEMES.plain} />
    </div>
    <div className={styles.typeClass}>
      <SelectInput
        value={defaultPropType}
        options={PROP_TYPES_OPTIONS}
        defaultValue={defaultPropType}
        updateValue={() => {}}
        isCreatable={false}
        isMulti={false}
        inputId=""
      />
    </div>
    <div className={styles.deleteClass}>
      <RoundIconButton onClick={() => {}}>
        <FaTrash size={11} />
      </RoundIconButton>
    </div>
  </div>
);

export default RepeaterModelInput;
