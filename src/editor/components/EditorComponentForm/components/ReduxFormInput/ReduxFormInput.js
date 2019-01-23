// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { EditorFormInputModel, EditorFormReduxTypes } from '../../data/models';
import type { ReduxState } from '../../../../../redux/store';
import FormInput from '../FormInput/FormInput';
import { getReduxStyleStyleValue } from '../../../../../redux/styles/state';
import { setModuleStyleValueRedux } from '../../../../../redux/styles/reducer';
import { EDITOR_FORM_REDUX_TYPES } from '../../data/models';
import { getReduxComponentBlockPropValue } from '../../../../../redux/editor/state';
import { setBlockPropValueRedux } from '../../../../../redux/editor/reducer';

type Props = {
  input: EditorFormInputModel,
  value: any,
  updateValue: (value: any) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  blockStyleKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  styleStateKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  reduxType: EditorFormReduxTypes,
  // eslint-disable-next-line react/no-unused-prop-types
  componentKey: string,
  // eslint-disable-next-line react/no-unused-prop-types
  blockKey: string,
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

const mapStateToProps = (
  state: ReduxState,
  { input, blockStyleKey, styleStateKey, reduxType, componentKey, blockKey }: Props
) => {
  let value;
  if (reduxType === EDITOR_FORM_REDUX_TYPES.style) {
    value = getReduxStyleStyleValue(state, input, styleStateKey, blockStyleKey);
  } else {
    value = getReduxComponentBlockPropValue(state.editor, componentKey, blockKey, input.key);
  }
  return {
    value,
  };
};

const mapDispatchToProps = (
  dispatch: any,
  { input, blockStyleKey, styleStateKey, reduxType, componentKey, blockKey }: Props
) => {
  const { key } = input;
  let updateValue;
  if (reduxType === EDITOR_FORM_REDUX_TYPES.style) {
    updateValue = (value: any) => {
      dispatch(setModuleStyleValueRedux(blockStyleKey, styleStateKey, key, value));
    };
  } else {
    updateValue = (value: any) => {
      dispatch(setBlockPropValueRedux(componentKey, blockKey, key, value));
    };
  }
  return {
    updateValue,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormInput);
