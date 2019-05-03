// @flow

import type {
  EditorFormInputModel,
  EditorFormSectionColumnModel,
  EditorFormSectionModel,
  FormDataModel,
} from './models';
import { EDITOR_FORM_REDUX_TYPES } from './models';
import { FORM_INPUT_TYPES } from '../components/FormInput/components/FormInputBody/FormInputBody';

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

const fontStyleInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'font-style',
  key: 'font-style',
  inputType: FORM_INPUT_TYPES.fontStyle,
};

const fontStyleColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontStyleInput,
};

const lineHeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'line-height',
  key: 'line-height',
  inputType: FORM_INPUT_TYPES.string,
};

const lineHeightColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: lineHeightInput,
};

const textAlignInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'text-align',
  key: 'text-align',
  inputType: FORM_INPUT_TYPES.textAlign,
};

const textAlignColumn: EditorFormSectionColumnModel = {
  columns: 4,
  input: textAlignInput,
};

const textFormSection: EditorFormSectionModel = {
  heading: 'Text',
  key: 'text',
  columns: [
    fontFamilyColumn,
    fontSizeColumn,
    fontWeightColumn,
    colorColumn,
    fontStyleColumn,
    lineHeightColumn,
    textAlignColumn,
  ],
};

// Appearance

const displayInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'display',
  key: 'display',
  inputType: FORM_INPUT_TYPES.display,
};

const visibilityInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'visibility',
  key: 'visibility',
  inputType: FORM_INPUT_TYPES.visibility,
};

const marginInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'margin',
  key: 'margin',
  inputType: FORM_INPUT_TYPES.string,
};

const paddingInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'padding',
  key: 'padding',
  inputType: FORM_INPUT_TYPES.string,
};

const widthInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'width',
  key: 'width',
  inputType: FORM_INPUT_TYPES.string,
};

const minWidthInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'min-width',
  key: 'min-width',
  inputType: FORM_INPUT_TYPES.string,
};

const heightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'height',
  key: 'height',
  inputType: FORM_INPUT_TYPES.string,
};

const minHeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'minheight',
  key: 'min-height',
  inputType: FORM_INPUT_TYPES.string,
};

const opacityInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'opacity',
  key: 'opacity',
  inputType: FORM_INPUT_TYPES.string,
};

const backgroundColorInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'bg-color',
  key: 'background-color',
  inputType: FORM_INPUT_TYPES.color,
};

const appearanceFormSection: EditorFormSectionModel = {
  heading: 'Appearance',
  key: 'appearance',
  columns: [
    {
      columns: 2,
      input: displayInput,
    },
    {
      columns: 2,
      input: visibilityInput,
    },
    {
      columns: 1,
      input: marginInput,
    },
    {
      columns: 1,
      input: paddingInput,
    },
    {
      columns: 1,
      input: widthInput,
    },
    {
      columns: 1,
      input: minWidthInput,
    },
    {
      columns: 1,
      input: heightInput,
    },
    {
      columns: 1,
      input: minHeightInput,
    },
    {
      columns: 1,
      input: opacityInput,
    },
    {
      columns: 1,
      input: backgroundColorInput,
    },
  ],
};

// Custom

export const customFormSection: EditorFormSectionModel = {
  heading: 'Custom',
  key: 'custom',
  columns: [],
};

// State

export const stylesStateFormSection: EditorFormSectionModel = {
  heading: 'Selector',
  key: 'stylesState',
  columns: [],
};

// Mixins

export const stylesMixinsFormSection: EditorFormSectionModel = {
  heading: 'Mixins',
  key: 'mixinsState',
  columns: [],
};

export const STYLES_FORM_DATA: FormDataModel = {
  sections: [textFormSection, appearanceFormSection],
};
