// @flow

import type { GenericAction } from '../editor/reducer';
import { dummyStylesReduxState } from '../../data/dummy/redux';
import {
  addMixinToStyle,
  clearStyleStyleState,
  removeMixinFromStyle,
  updateStyleStyleValue,
} from '../../data/styles/modifiers';
import type { StylesReduxState } from './state';
import { getStylesFromStylesReduxState } from './state';

export const initialStylesReduxState: StylesReduxState = {
  unsavedChanges: false,
  ...dummyStylesReduxState,
};

const SET_STYLES_STATE = 'SET_STYLES_STATE';

type SetStylesStatePayload = {
  state: StylesReduxState,
};

type SetStylesStateAction = {
  type: string,
  payload: SetStylesStatePayload,
};

export function setStylesStateRedux(state: StylesReduxState): SetStylesStateAction {
  return {
    type: SET_STYLES_STATE,
    payload: {
      state,
    },
  };
}

function handleSetStylesState(
  oldState: StylesReduxState,
  { state }: SetStylesStatePayload
): StylesReduxState {
  return {
    ...state,
  };
}

const REMOVE_MIXIN_FROM_STYLE = 'REMOVE_MIXIN_FROM_STYLE';

type RemoveMixinFromStylePayload = {
  styleKey: string,
  styleStateKey: string,
  mixinKey: string,
};

type RemoveMixinFromStyleAction = {
  type: string,
  payload: RemoveMixinFromStylePayload,
};

export function removeMixinFromStyleRedux(
  styleKey: string,
  styleStateKey: string,
  mixinKey: string
): RemoveMixinFromStyleAction {
  return {
    type: REMOVE_MIXIN_FROM_STYLE,
    payload: {
      styleKey,
      styleStateKey,
      mixinKey,
    },
  };
}

function handleRemoveMixinFromStyle(
  state: StylesReduxState,
  { styleKey, styleStateKey, mixinKey }: RemoveMixinFromStylePayload
): StylesReduxState {
  const styles = getStylesFromStylesReduxState(state);
  return {
    ...state,
    styles: {
      ...styles,
      [styleKey]: removeMixinFromStyle(styles[styleKey], styleKey, styleStateKey, mixinKey),
    },
    unsavedChanges: true,
  };
}

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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
  // todo - check input type to determine whether to set undoGroup
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
    unsavedChanges: true,
  };
}

const ACTION_HANDLERS = {
  [SET_STYLES_STATE]: handleSetStylesState,
  [REMOVE_MIXIN_FROM_STYLE]: handleRemoveMixinFromStyle,
  [ADD_MIXIN_TO_STYLE]: handleAddMixinToStyle,
  [CLEAR_STYLE_STATE]: handleClearStyleState,
  [CLEAR_MODULE_STYLE_VALUE]: handleClearModuleStyleValue,
  [SET_MODULE_STYLE_VALUE]: handleSetModuleStyleValue,
};

export const STYLES_UNDOABLE_ACTIONS = [
  SET_STYLES_STATE,
  REMOVE_MIXIN_FROM_STYLE,
  ADD_MIXIN_TO_STYLE,
  CLEAR_STYLE_STATE,
  CLEAR_MODULE_STYLE_VALUE,
  SET_MODULE_STYLE_VALUE,
];

export default function stylesReducer(
  state: StylesReduxState = initialStylesReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
