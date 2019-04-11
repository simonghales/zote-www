// @flow

import type { StylesModels } from '../../data/styles/model';
import type { EditorReduxState, GenericAction } from '../editor/reducer';
import { dummyStylesReduxState } from '../../data/dummy/redux';
import { updateStyleStyleValue } from '../../data/styles/modifiers';
import type { MixinsModel } from '../../data/mixin/model';

export type StylesReduxState = {
  styles: StylesModels,
  mixins: MixinsModel,
};

export const initialStylesReduxState: StylesReduxState = {
  ...dummyStylesReduxState,
};

const CLEAR_MODULE_STYLE_VALUE = 'CLEAR_MODULE_STYLE_VALUE';

type ClearModuleStyleValuePayload = {
  styleKey: string,
  styleStateKey: string,
  styleValueKey: string,
};

type ClearModuleStyleValueAction = {
  type: string,
  payload: ClearModuleStyleValuePayload,
};

export function clearModuleStyleValueRedux(
  styleKey: string,
  styleStateKey: string,
  styleValueKey: string
): ClearModuleStyleValueAction {
  return {
    type: CLEAR_MODULE_STYLE_VALUE,
    payload: {
      styleKey,
      styleStateKey,
      styleValueKey,
    },
  };
}

function handleClearModuleStyleValue(
  state: EditorReduxState,
  { styleKey, styleStateKey, styleValueKey }: ClearModuleStyleValuePayload
): EditorReduxState {
  return {
    ...state,
    [styleKey]: updateStyleStyleValue(state[styleKey], styleKey, styleStateKey, styleValueKey),
  };
}

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
    [styleKey]: updateStyleStyleValue(
      state[styleKey],
      styleKey,
      styleStateKey,
      styleValueKey,
      value
    ),
  };
}

const ACTION_HANDLERS = {
  [CLEAR_MODULE_STYLE_VALUE]: handleClearModuleStyleValue,
  [SET_MODULE_STYLE_VALUE]: handleSetModuleStyleValue,
};

export default function stylesReducer(
  state: StylesReduxState = initialStylesReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
