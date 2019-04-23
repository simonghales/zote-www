// @flow

import type { EditorFormInputPropInputModel } from '../../data/models';
import type { FormInputTypes } from './components/FormInputBody/FormInputBody';

export type FormInputComponentProps = {
  inputKey: string,
  name: string,
  inactive?: boolean,
  defaultValue: any,
  value: any,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
};

export type FormInputProps = FormInputComponentProps & {
  componentKey: string,
  blockKey: string,
  // eslint-disable-next-line react/require-default-props
  propInput?: EditorFormInputPropInputModel | null,
};
