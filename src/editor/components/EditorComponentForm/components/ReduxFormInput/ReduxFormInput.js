// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { EditorFormInputModel } from '../../data/models';
import type { ReduxState } from '../../../../../redux/store';
import FormInput from '../FormInput/FormInput';

type Props = {
  input: EditorFormInputModel,
  value: any,
};

const ReduxFormInput = ({ input, value }: Props) => (
  <FormInput name={input.name} value={value} inactive={input.inactive} />
);

const mapStateToProps = (state: ReduxState, { input }: Props) => {
  const { key } = input;
  return {
    value: state.editor.test[key],
  };
};

export default connect(mapStateToProps)(ReduxFormInput);
