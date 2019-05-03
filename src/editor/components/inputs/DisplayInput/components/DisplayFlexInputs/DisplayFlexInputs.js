// @flow
import React from 'react';
import FormInput from '../../../../EditorComponentForm/components/FormInput/FormInput';
import { FORM_INPUT_TYPES } from '../../../../EditorComponentForm/components/FormInput/components/FormInputBody/FormInputBody';
import FormColumn from '../../../../EditorComponentForm/components/FormColumnsSection/components/FormColumn/FormColumn';
import * as styles from './styles';
import FormInputWrapper from '../../../../EditorComponentForm/components/FormInput/components/FormInputWrapper/FormInputWrapper';

const DisplayFlexInputs = () => (
  <div className={styles.containerClass}>
    <FormColumn columns={4}>
      <FormInputWrapper name="Direction">
        <div>input...</div>
      </FormInputWrapper>
    </FormColumn>
    <FormColumn columns={4}>
      <FormInput
        updateValue={() => {}}
        defaultValue=""
        value=""
        inputType={FORM_INPUT_TYPES.string}
        name="Align"
        inputKey=""
        inactive={false}
      />
    </FormColumn>
    <FormColumn columns={4}>
      <FormInput
        updateValue={() => {}}
        defaultValue=""
        value=""
        inputType={FORM_INPUT_TYPES.string}
        name="Justify"
        inputKey=""
        inactive={false}
      />
    </FormColumn>
    <FormColumn columns={4}>
      <FormInput
        updateValue={() => {}}
        defaultValue=""
        value=""
        inputType={FORM_INPUT_TYPES.string}
        name="Children"
        inputKey=""
        inactive={false}
      />
    </FormColumn>
  </div>
);

export default DisplayFlexInputs;
