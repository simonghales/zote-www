// @flow
import React from 'react';
import type { Node } from 'react';
import type { EditorFormInputModel } from '../../data/models';
import FormInput from '../FormInput/FormInput';

type Props = {
  input: EditorFormInputModel,
};

const ReduxFormInput = ({ input }: Props) => <div>ReduxFormInput</div>;

export default ReduxFormInput;

export function getFormInput(input: EditorFormInputModel): Node {
  if (input.reduxConnected) {
    return <ReduxFormInput input={input} />;
  }
  return <FormInput name={input.name} value={input.value} inactive={input.inactive} />;
}
