// @flow
import React from 'react';
import { cx } from 'emotion';
import { FaCaretDown } from 'react-icons/fa';
import styles from './styles';
import TextInput from '../../../inputs/TextInput/TextInput';
import {
  FontFamilyInput,
  FontStyleInput,
  FontWeightInput,
  HtmlContainerInput,
  HtmlHeadingInput,
  HtmlInput,
} from '../../../inputs/SelectInput/SelectInput';
import ColorInput from '../../../inputs/ColorInput/ColorInput';
import { TextAlignInput } from '../../../inputs/RadioInput/RadioInput';
import ArrayKeyValueInput from '../../../inputs/ArrayKeyValueInput/ArrayKeyValueInput';

export type DefaultFormInputProps = {
  inputId: string,
  defaultValue: string,
  value: string,
  updateValue: (value: any) => void,
};

export const FORM_INPUT_TYPES = {
  string: 'string',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  textAlign: 'textAlign',
  color: 'color',
  html: 'html',
  htmlContainer: 'htmlContainer',
  htmlHeading: 'htmlHeading',
  htmlAttributes: 'htmlAttributes',
};

export type FormInputTypes = $Keys<typeof FORM_INPUT_TYPES>;

const MAPPED_FORM_INPUT_TYPES = {
  [FORM_INPUT_TYPES.string]: TextInput,
  [FORM_INPUT_TYPES.fontFamily]: FontFamilyInput,
  [FORM_INPUT_TYPES.fontWeight]: FontWeightInput,
  [FORM_INPUT_TYPES.fontStyle]: FontStyleInput,
  [FORM_INPUT_TYPES.color]: ColorInput,
  [FORM_INPUT_TYPES.textAlign]: TextAlignInput,
  [FORM_INPUT_TYPES.html]: HtmlInput,
  [FORM_INPUT_TYPES.htmlContainer]: HtmlContainerInput,
  [FORM_INPUT_TYPES.htmlHeading]: HtmlHeadingInput,
  [FORM_INPUT_TYPES.htmlAttributes]: ArrayKeyValueInput,
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
        <div>
          <FaCaretDown size={11} />
        </div>
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
