// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';
import TextInput from '../../../inputs/TextInput/TextInput';
import { FontFamilyInput, FontWeightInput } from '../../../inputs/SelectInput/SelectInput';
import ColorInput from '../../../inputs/ColorInput/ColorInput';

export type DefaultFormInputProps = {
  inputId: string,
  defaultValue: string,
  value: string,
  updateValue: (value: string) => void,
};

export const FORM_INPUT_TYPES = {
  string: 'string',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  color: 'color',
};

export type FormInputTypes = $Keys<typeof FORM_INPUT_TYPES>;

const MAPPED_FORM_INPUT_TYPES = {
  [FORM_INPUT_TYPES.string]: TextInput,
  [FORM_INPUT_TYPES.fontFamily]: FontFamilyInput,
  [FORM_INPUT_TYPES.fontWeight]: FontWeightInput,
  [FORM_INPUT_TYPES.color]: ColorInput,
};

function getMappedFormInput(inputType: FormInputTypes) {
  const component = MAPPED_FORM_INPUT_TYPES[inputType];
  if (!component) {
    throw new Error(`No component matched for inputType "${inputType}"`);
  }
  return component;
}

type Props = {
  inputKey: string,
  name: string,
  value: any,
  defaultValue: any,
  inactive?: boolean,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
};

export function getFormInputId(key: string) {
  return `form-input-${key}`;
}

const FormInput = ({
  inputKey,
  name,
  inactive,
  defaultValue,
  value,
  updateValue,
  inputType,
}: Props) => {
  const inputId = getFormInputId(inputKey);
  const Input = getMappedFormInput(inputType);
  return (
    <div>
      <header className={styles.headerClass}>
        <label
          className={cx(styles.labelClass, {
            [styles.labelInactiveClass]: inactive,
          })}
          htmlFor={inputId}
        >
          {name}
        </label>
      </header>
      <div>
        <Input
          inputId={inputId}
          value={value}
          defaultValue={defaultValue}
          updateValue={updateValue}
        />
      </div>
    </div>
  );
};

FormInput.defaultProps = {
  inactive: false,
};

export default FormInput;
