// @flow

import type {EditorFormInputPropInputModel} from '../../data/models';
import type {FormInputTypes} from './components/FormInputBody/FormInputBody';

export type FormInputProps = {
  inputKey: string,
  name: string,
  value: any,
  defaultValue: any,
  inactive?: boolean,
  updateValue: (value: any) => void,
  inputType: FormInputTypes,
  componentKey: string,
  blockKey: string,
  // eslint-disable-next-line react/require-default-props
  propInput?: EditorFormInputPropInputModel | null,
};
