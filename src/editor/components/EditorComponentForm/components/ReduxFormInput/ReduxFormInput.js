// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { EditorFormInputModel } from '../../data/models';
import type { ReduxState } from '../../../../../redux/store';
import FormInput from '../FormInput/FormInput';
import { getReduxStyleStyleValue } from '../../../../../redux/styles/state';
import { setModuleStyleValueRedux } from '../../../../../redux/styles/reducer';

type Props = {
  input: EditorFormInputModel,
  value: any,
  updateValue: (value: any) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  blockStyleKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  styleStateKey: string,
};

const ReduxFormInput = ({ input, value, updateValue }: Props) => (
  <FormInput
    inputKey={input.key}
    name={input.name}
    defaultValue={input.defaultValue}
    value={value}
    updateValue={updateValue}
    inactive={!value}
    inputType={input.inputType}
  />
);

const mapStateToProps = (state: ReduxState, { input, blockStyleKey, styleStateKey }: Props) => {
  const value = getReduxStyleStyleValue(state, input, styleStateKey, blockStyleKey);
  return {
    value,
  };
};

const mapDispatchToProps = (dispatch: any, { input, blockStyleKey, styleStateKey }: Props) => {
  const { key } = input;
  return {
    updateValue: (value: any) => {
      dispatch(setModuleStyleValueRedux(blockStyleKey, styleStateKey, key, value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormInput);
