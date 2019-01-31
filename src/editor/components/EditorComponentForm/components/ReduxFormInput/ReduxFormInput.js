// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { EditorFormInputModel, EditorFormReduxTypes } from '../../data/models';
import type { ReduxState } from '../../../../../redux/store';
import FormInput, { getFormInputComponent } from '../FormInput/FormInput';
import { getReduxStyleStyleValue } from '../../../../../redux/styles/state';
import { setModuleStyleValueRedux } from '../../../../../redux/styles/reducer';
import { EDITOR_FORM_REDUX_TYPES } from '../../data/models';
import {
  getReduxComponentBlockProp,
  getReduxComponentBlockPropDefaultValue,
  getReduxComponentBlockPropValue,
} from '../../../../../redux/editor/state';
import { setBlockPropValueRedux } from '../../../../../redux/editor/reducer';
import { getLinkedFromProp, getValueFromProp } from '../../../../../data/block/props/state';

type Props = {
  input: EditorFormInputModel,
  value: any,
  defaultValue: any,
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
  inactive: boolean,
  linkedBlockKey: string | null,
  linkedPropKey: string | null,
};

const ReduxFormInput = ({
  input,
  value,
  inactive,
  defaultValue,
  updateValue,
  componentKey,
  blockKey,
  linkedBlockKey,
  linkedPropKey,
}: Props) => {
  const FormInputComponent = getFormInputComponent(input);
  return (
    <FormInputComponent
      inputKey={input.key}
      name={input.name}
      defaultValue={defaultValue}
      value={value}
      updateValue={updateValue}
      inactive={inactive}
      inputType={input.inputType}
      dropDownComponent={input.dropdownMenu}
      componentKey={componentKey}
      blockKey={blockKey}
      propInput={input.propInput}
      linkedBlockKey={linkedBlockKey}
      linkedPropKey={linkedPropKey}
    />
  );
};

const mapStateToProps = (
  state: ReduxState,
  { input, blockStyleKey, styleStateKey, reduxType, componentKey, blockKey }: Props
) => {
  let value;
  let linkedBlockKey = null;
  let linkedPropKey = null;
  // eslint-disable-next-line prefer-destructuring
  let defaultValue = input.defaultValue;
  if (reduxType === EDITOR_FORM_REDUX_TYPES.style) {
    value = getReduxStyleStyleValue(state, input, styleStateKey, blockStyleKey);
  } else {
    const prop = getReduxComponentBlockProp(state.editor, componentKey, blockKey, input.key);
    value = prop ? getValueFromProp(prop) : null;
    const propLinked = prop ? getLinkedFromProp(prop) : null;
    if (propLinked) {
      linkedBlockKey = propLinked.blockKey;
      linkedPropKey = propLinked.propKey;
    }
    const fetchedDefaultValue = getReduxComponentBlockPropDefaultValue(
      state.editor,
      componentKey,
      blockKey,
      input.key
    );
    if (fetchedDefaultValue !== null) {
      defaultValue = fetchedDefaultValue;
    }
  }
  const inactive = !value;
  return {
    value,
    defaultValue,
    inactive,
    linkedBlockKey,
    linkedPropKey,
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
