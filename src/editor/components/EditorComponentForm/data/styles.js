// @flow
import React from 'react';

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
  name: 'Font',
  key: 'font-family',
  inputType: FORM_INPUT_TYPES.fontFamily,
};

const fontFamilyColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontFamilyInput,
};

const fontSizeInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Size',
  key: 'font-size',
};

const fontSizeColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: fontSizeInput,
};

const fontWeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Weight',
  key: 'font-weight',
  inputType: FORM_INPUT_TYPES.fontWeight,
};

const fontWeightColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontWeightInput,
};

const colorInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Color',
  key: 'color',
  inputType: FORM_INPUT_TYPES.color,
};

const colorColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: colorInput,
};

const fontStyleInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Style',
  key: 'font-style',
  inputType: FORM_INPUT_TYPES.fontStyle,
};

const fontStyleColumn: EditorFormSectionColumnModel = {
  columns: 3,
  input: fontStyleInput,
};

const lineHeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Height',
  key: 'line-height',
  inputType: FORM_INPUT_TYPES.string,
};

const lineHeightColumn: EditorFormSectionColumnModel = {
  columns: 1,
  input: lineHeightInput,
};

const textAlignInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Align',
  key: 'text-align',
  inputType: FORM_INPUT_TYPES.textAlign,
};

const textAlignColumn: EditorFormSectionColumnModel = {
  columns: 4,
  input: textAlignInput,
};

const textFormSection: EditorFormSectionModel = {
  heading: 'Typography',
  key: 'typography',
  columns: [
    fontFamilyColumn,
    fontSizeColumn,
    fontWeightColumn,
    lineHeightColumn,
    fontStyleColumn,
    colorColumn,
    textAlignColumn,
  ],
};

// Layout

const displayInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Display',
  key: 'display',
  inputType: FORM_INPUT_TYPES.display,
};

const layoutFormSection: EditorFormSectionModel = {
  heading: 'Layout',
  key: 'layout',
  columns: [
    {
      columns: 4,
      input: displayInput,
    },
  ],
};

// Appearance

const visibilityInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Visibility',
  key: 'visibility',
  inputType: FORM_INPUT_TYPES.visibility,
};

const marginInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Margin',
  key: 'margin',
  inputType: FORM_INPUT_TYPES.string,
};

const paddingInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Padding',
  key: 'padding',
  inputType: FORM_INPUT_TYPES.string,
};

const widthInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Width',
  key: 'width',
  inputType: FORM_INPUT_TYPES.string,
};

const minWidthInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Min W',
  key: 'min-width',
  inputType: FORM_INPUT_TYPES.string,
};

const maxWidthInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Max W',
  key: 'max-width',
  inputType: FORM_INPUT_TYPES.string,
};

const heightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Height',
  key: 'height',
  inputType: FORM_INPUT_TYPES.string,
};

const minHeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Min H',
  key: 'min-height',
  inputType: FORM_INPUT_TYPES.string,
};

const maxHeightInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Max H',
  key: 'max-height',
  inputType: FORM_INPUT_TYPES.string,
};

const opacityInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'Opacity',
  key: 'opacity',
  inputType: FORM_INPUT_TYPES.string,
};

const backgroundColorInput: EditorFormInputModel = {
  ...defaultReduxStyleInput,
  name: 'BG Color',
  key: 'background-color',
  inputType: FORM_INPUT_TYPES.color,
};

const appearanceFormSection: EditorFormSectionModel = {
  heading: 'Appearance',
  key: 'appearance',
  columns: [
    {
      columns: 4,
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
      input: opacityInput,
    },
    {
      columns: 1,
      input: backgroundColorInput,
    },
    {
      columns: 2,
      input: widthInput,
    },
    {
      columns: 1,
      input: minWidthInput,
    },
    {
      columns: 1,
      input: maxWidthInput,
    },
    {
      columns: 2,
      input: heightInput,
    },
    {
      columns: 1,
      input: minHeightInput,
    },
    {
      columns: 1,
      input: maxHeightInput,
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
  sections: [layoutFormSection, textFormSection, appearanceFormSection],
};
