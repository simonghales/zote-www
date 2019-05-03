// @flow
import type { Node } from 'react';
import React from 'react';
import type { EditorFormInputModel, EditorFormReduxTypes } from '../../data/models';
import FormInputHeader from './components/FormInputHeader/FormInputHeader';
import FormInputBody from './components/FormInputBody/FormInputBody';
import type { FormInputComponentProps } from './props';
import { PropFormInput } from './components/PropFormInput/PropFormInput';
import { EDITOR_FORM_REDUX_TYPES } from '../../data/models';
import StyleFormInput from './components/StyleFormInput/StyleFormInput';
import FormInputWrapper from './components/FormInputWrapper/FormInputWrapper';

export type DefaultFormInputProps = {
  inputId: string,
  defaultValue: string,
  value: string,
  updateValue: (value: any) => void,
};

type Props = FormInputComponentProps;

export function getFormInputId(key: string) {
  return `form-input-${key}`;
}

const FormInput = ({
  inputKey,
  name,
  inactive = false,
  defaultValue,
  value,
  updateValue,
  inputType,
}: Props) => {
  const inputId = getFormInputId(inputKey);
  return (
    <FormInputWrapper inactive={inactive} inputId={inputId} name={name}>
      <FormInputBody
        updateValue={updateValue}
        value={value}
        defaultValue={defaultValue}
        inputType={inputType}
        inputId={inputId}
      />
    </FormInputWrapper>
  );
};

FormInput.defaultProps = {
  inactive: false,
};

export default FormInput;

export function getFormInputComponent(
  input: EditorFormInputModel,
  reduxType?: EditorFormReduxTypes
) {
  if (reduxType) {
    if (reduxType === EDITOR_FORM_REDUX_TYPES.style) {
      return StyleFormInput;
    }
    if (input.propInput) {
      return PropFormInput;
    }
  }
  return FormInput;
}
