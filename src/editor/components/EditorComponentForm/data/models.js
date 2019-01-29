// @flow
import type { Node } from 'react';
import type { FormInputTypes } from '../components/FormInput/FormInput';

export const EDITOR_FORM_REDUX_TYPES = {
  prop: 'prop',
  style: 'style',
};

export type EditorFormReduxTypes = $Keys<typeof EDITOR_FORM_REDUX_TYPES>;

export type EditorFormInputPropInputModel = {
  editable: boolean,
  deleteable: boolean,
};

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
  propInput?: EditorFormInputPropInputModel | null,
  inputType: FormInputTypes,
  dropdownMenu?: Node,
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
  columns: Array<EditorFormSectionColumnModel>,
};

export type FormDataModel = {
  sections: Array<EditorFormSectionModel>,
};
