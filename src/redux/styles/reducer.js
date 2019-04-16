// @flow

import type { GenericAction } from '../editor/reducer';
import { dummyStylesReduxState } from '../../data/dummy/redux';
import {
  addMixinToStyle,
  clearStyleStyleState,
  updateStyleStyleValue,
} from '../../data/styles/modifiers';
import type { StylesReduxState } from './state';
import { getStylesFromStylesReduxState } from './state';

export const initialStylesReduxState: StylesReduxState = {
  ...dummyStylesReduxState,
};

const ADD_MIXIN_TO_STYLE = 'ADD_MIXIN_TO_STYLE';

type AddMixinToStylePayload = {
  styleKey: string,
  styleStateKey: string,
  mixinKey: string,
};

type AddMixinToStyleAction = {
  type: string,
  payload: AddMixinToStylePayload,
};

export function addMixinToStyleRedux(
  styleKey: string,
  styleStateKey: string,
  mixinKey: string
): AddMixinToStyleAction {
  return {
    type: ADD_MIXIN_TO_STYLE,
    payload: {
      styleKey,
      styleStateKey,
      mixinKey,
    },
  };
}

function handleAddMixinToStyle(
  state: StylesReduxState,
  { styleKey, styleStateKey, mixinKey }: AddMixinToStylePayload
): StylesReduxState {
  const styles = getStylesFromStylesReduxState(state);
  return {
    ...state,
    styles: {
      ...styles,
      [styleKey]: addMixinToStyle(styles[styleKey], styleKey, styleStateKey, mixinKey),
    },
  };
}

const CLEAR_STYLE_STATE = 'CLEAR_STYLE_STATE';

type ClearStyleStatePayload = {
  styleKey: string,
  styleStateKey: string,
};

type ClearStyleStateAction = {
  type: string,
  payload: ClearStyleStatePayload,
};

export function clearStyleStateRedux(
  styleKey: string,
  styleStateKey: string
): ClearStyleStateAction {
  return {
    type: CLEAR_STYLE_STATE,
    payload: {
      styleKey,
      styleStateKey,
    },
  };
}

function handleClearStyleState(
  state: StylesReduxState,
  { styleKey, styleStateKey }: ClearStyleStatePayload
): StylesReduxState {
  const styles = getStylesFromStylesReduxState(state);
  return {
    ...state,
    styles: {
      ...styles,
      [styleKey]: clearStyleStyleState(styles[styleKey], styleStateKey),
    },
  };
}

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
  state: StylesReduxState,
  { styleKey, styleStateKey, styleValueKey }: ClearModuleStyleValuePayload
): StylesReduxState {
  const styles = getStylesFromStylesReduxState(state);
  return {
    ...state,
    styles: {
      ...styles,
      [styleKey]: updateStyleStyleValue(styles[styleKey], styleKey, styleStateKey, styleValueKey),
    },
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
  state: StylesReduxState,
  { styleKey, styleStateKey, styleValueKey, value }: SetModuleStyleValuePayload
): StylesReduxState {
  const styles = getStylesFromStylesReduxState(state);
  return {
    ...state,
    styles: {
      ...styles,
      [styleKey]: updateStyleStyleValue(
        styles[styleKey],
        styleKey,
        styleStateKey,
        styleValueKey,
        value
      ),
    },
  };
}

const ACTION_HANDLERS = {
  [ADD_MIXIN_TO_STYLE]: handleAddMixinToStyle,
  [CLEAR_STYLE_STATE]: handleClearStyleState,
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
