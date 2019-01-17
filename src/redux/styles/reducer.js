// @flow

import type { StylesModels } from '../../data/styles/model';
import type { EditorReduxState, GenericAction } from '../editor/reducer';
import { dummyStylesReduxState } from '../../data/dummy/redux';
import { updateStyleStyleValue } from '../../data/styles/modifiers';

export type StylesReduxState = StylesModels;

export const initialStylesReduxState: StylesReduxState = {
  ...dummyStylesReduxState,
};

const SET_MODULE_STYLE_VALUE = 'SET_MODULE_STYLE_VALUE';

type SetModuleStyleValuePayload = {
  styleKey: string,
  styleStateKey: string,
  styleValueKey: string,
  value: any,
};

type SetModuleStyleValueAction = {
  type: string,
  payload: SetModuleStyleValuePayload,
};

export function setModuleStyleValueRedux(
  styleKey: string,
  styleStateKey: string,
  styleValueKey: string,
  value: any
): SetModuleStyleValueAction {
  return {
    type: SET_MODULE_STYLE_VALUE,
    payload: {
      styleKey,
      styleStateKey,
      styleValueKey,
      value,
    },
  };
}

function handleSetModuleStyleValue(
  state: EditorReduxState,
  { styleKey, styleStateKey, styleValueKey, value }: SetModuleStyleValuePayload
): EditorReduxState {
  return {
    ...state,
    [styleKey]: updateStyleStyleValue(state[styleKey], styleStateKey, styleValueKey, value),
  };
}

const ACTION_HANDLERS = {
  [SET_MODULE_STYLE_VALUE]: handleSetModuleStyleValue,
};

export default function stylesReducer(
  state: StylesReduxState = initialStylesReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
