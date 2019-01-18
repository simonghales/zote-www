// @flow

import type {
  EditorFormInputModel,
  EditorFormSectionColumnModel,
  EditorFormSectionModel,
  FormDataModel,
} from './models';
import { EDITOR_FORM_REDUX_TYPES } from './models';
import { FORM_INPUT_TYPES } from '../components/FormInput/FormInput';

// Text

const defaultReduxStyleInput = {
  inactive: false,
  defaultValue: '',
  value: '',
  onChange: () => {},
  reduxConnected: {
    type: EDITOR_FORM_REDUX_TYPES.style,
  },
  inputType: FORM_INPUT_TYPES.string,
};

const fontFamilyInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'font-family',
  key: 'font-family',
  inputType: FORM_INPUT_TYPES.fontFamily,
};

const fontFamilyColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontFamilyInput,
};

const fontSizeInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'font-size',
  key: 'font-size',
};

const fontSizeColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: fontSizeInput,
};

const fontWeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'font-weight',
  key: 'font-weight',
  inputType: FORM_INPUT_TYPES.fontWeight,
};

const fontWeightColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontWeightInput,
};

const colorInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'color',
  key: 'color',
  inputType: FORM_INPUT_TYPES.color,
};

const colorColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: colorInput,
};

const textFormSection: EditorFormSectionModel = {
  heading: 'Text',
  key: 'text',
  columns: [fontFamilyColumn, fontSizeColumn, fontWeightColumn, colorColumn],
};

// Appearance

const appearanceFormSection: EditorFormSectionModel = {
  heading: 'Appearance',
  key: 'appearance',
  columns: [],
};

export const STYLES_FORM_DATA: FormDataModel = {
  sections: [textFormSection, appearanceFormSection],
};
