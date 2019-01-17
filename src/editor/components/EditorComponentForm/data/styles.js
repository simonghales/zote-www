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

const textFormSection: EditorFormSectionModel = {
  heading: 'Text',
  key: 'text',
  rows: [
    {
      columns: [fontFamilyColumn, fontSizeColumn],
    },
  ],
};

// Appearance

const appearanceFormSection: EditorFormSectionModel = {
  heading: 'Appearance',
  key: 'appearance',
  rows: [],
};

export const STYLES_FORM_DATA: FormDataModel = {
  sections: [textFormSection, appearanceFormSection],
};
