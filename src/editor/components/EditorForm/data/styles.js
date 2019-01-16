// @flow

import type {
  EditorFormInputModel,
  EditorFormSectionColumnModel,
  EditorFormSectionModel,
  FormDataModel,
} from './models';
import { EDITOR_FORM_REDUX_TYPES } from './models';

// Text

const fontFamilyInput: EditorFormInputModel = {
  name: 'font-family',
  key: 'font-family',
  inactive: true,
  value: '',
  onChange: () => {},
  reduxConnected: {
    type: EDITOR_FORM_REDUX_TYPES.style,
  },
};

const fontFamilyColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontFamilyInput,
};

const textFormSection: EditorFormSectionModel = {
  heading: 'Text',
  key: 'text',
  rows: [
    {
      columns: [fontFamilyColumn],
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
