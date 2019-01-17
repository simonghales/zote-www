// @flow

import type { FormInputTypes } from '../components/FormInput/FormInput';

export const EDITOR_FORM_REDUX_TYPES = {
  style: 'style',
};

export type EditorFormReduxTypes = $Keys<typeof EDITOR_FORM_REDUX_TYPES>;

export type EditorFormInputModel = {
  name: string,
  key: string,
  inactive: boolean,
  defaultValue: any,
  value: any,
  onChange: (value: any) => void,
  reduxConnected?: {
    type: EditorFormReduxTypes,
  },
  inputType: FormInputTypes,
};

export type EditorFormSectionColumnModel = {
  columns: number,
  input: EditorFormInputModel,
};

export type EditorFormSectionRowModel = {
  columns: Array<EditorFormSectionColumnModel>,
};
export type EditorFormSectionModel = {
  heading: string,
  key: string,
  rows: Array<EditorFormSectionRowModel>,
};

export type FormDataModel = {
  sections: Array<EditorFormSectionModel>,
};
