// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { EditorFormInputModel } from '../../data/models';
import type { ReduxState } from '../../../../../redux/store';
import FormInput from '../FormInput/FormInput';

type Props = {
  input: EditorFormInputModel,
  value: any,
  // eslint-disable-next-line react/no-unused-prop-types
  componentKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  blockKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  blockStyleKey: string,
};

const ReduxFormInput = ({ input, value }: Props) => (
  <FormInput name={input.name} value={value} inactive={input.inactive} />
);

const mapStateToProps = (
  state: ReduxState,
  { input, componentKey, blockKey, blockStyleKey }: Props
) => {
  const { key } = input;
  return {
    value: state.editor.test[key],
  };
};

export default connect(mapStateToProps)(ReduxFormInput);
