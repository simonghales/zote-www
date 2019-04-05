// @flow
import React from 'react';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';
import SelectInput from '../../../../../SelectInput/SelectInput';
import { PROP_TYPES_OPTIONS } from '../../../../../SelectInput/data';

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
    <div>delete</div>
  </div>
);

export default RepeaterModelInput;
