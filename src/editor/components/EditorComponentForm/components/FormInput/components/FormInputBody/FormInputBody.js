// @flow
import React from 'react';
import TextInput from '../../../../../inputs/TextInput/TextInput';
import {
  FontFamilyInput,
  FontStyleInput,
  FontWeightInput,
  HtmlContainerInput,
  HtmlHeadingInput,
  HtmlInput,
  VisibilityInput,
} from '../../../../../inputs/SelectInput/SelectInput';
import ColorInput from '../../../../../inputs/ColorInput/ColorInput';
import { TextAlignInput } from '../../../../../inputs/RadioInput/RadioInput';
import ArrayKeyValueInput from '../../../../../inputs/ArrayKeyValueInput/ArrayKeyValueInput';
import RepeaterDataInput from '../../../../../inputs/RepeaterDataInput/RepeaterDataInput';
import DisplayInput from '../../../../../inputs/DisplayInput/DisplayInput';

export const FORM_INPUT_TYPES = {
  string: 'string',
  link: 'link',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  textAlign: 'textAlign',
  display: 'display',
  visibility: 'visibility',
  color: 'color',
  html: 'html',
  htmlContainer: 'htmlContainer',
  htmlHeading: 'htmlHeading',
  htmlAttributes: 'htmlAttributes',
  repeaterData: 'repeaterData',
};
export type FormInputTypes = $Keys<typeof FORM_INPUT_TYPES>;

const MAPPED_FORM_INPUT_TYPES = {
  [FORM_INPUT_TYPES.string]: TextInput,
  [FORM_INPUT_TYPES.link]: TextInput,
  [FORM_INPUT_TYPES.fontFamily]: FontFamilyInput,
  [FORM_INPUT_TYPES.fontWeight]: FontWeightInput,
  [FORM_INPUT_TYPES.fontStyle]: FontStyleInput,
  [FORM_INPUT_TYPES.color]: ColorInput,
  [FORM_INPUT_TYPES.textAlign]: TextAlignInput,
  [FORM_INPUT_TYPES.display]: DisplayInput,
  [FORM_INPUT_TYPES.visibility]: VisibilityInput,
  [FORM_INPUT_TYPES.html]: HtmlInput,
  [FORM_INPUT_TYPES.htmlContainer]: HtmlContainerInput,
  [FORM_INPUT_TYPES.htmlHeading]: HtmlHeadingInput,
  [FORM_INPUT_TYPES.htmlAttributes]: ArrayKeyValueInput,
  [FORM_INPUT_TYPES.repeaterData]: RepeaterDataInput,
};

function getMappedFormInput(inputType: FormInputTypes) {
  const component = MAPPED_FORM_INPUT_TYPES[inputType];
  if (!component) {
    throw new Error(`No component matched for inputType "${inputType}"`);
  }
  return component;
}

const FormInputBody = ({
  inputId,
  value,
  defaultValue,
  updateValue,
  inputType,
}: {
  inputId: string,
  value: any,
  defaultValue: any,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
}) => {
  const Input = getMappedFormInput(inputType);
  return (
    <div>
      <Input
        inputId={inputId}
        value={value}
        defaultValue={defaultValue}
        updateValue={updateValue}
      />
    </div>
  );
};

export default FormInputBody;
