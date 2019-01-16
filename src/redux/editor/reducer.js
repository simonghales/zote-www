// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';
import type { StylesModels } from '../../data/styles/model';

export type EditorReduxState = {
  components: ComponentsModels,
  styles: StylesModels,
  test: {
    [string]: any,
  },
};

export const initialEditorReduxState: EditorReduxState = {
  components: {},
  styles: {},
  test: {
    'font-family': 'hello world',
  },
  ...dummyEditorReduxState,
};

const SET_MODULE_STYLE_VALUE = 'SET_MODULE_STYLE_VALUE';

type SetModuleStyleValuePayload = {
  styleKey: string,
  value: any,
};

type SetModuleStyleValueAction = {
  type: string,
  payload: SetModuleStyleValuePayload,
};

export function setModuleStyleValueRedux(styleKey: string, value: any): SetModuleStyleValueAction {
  return {
    type: SET_MODULE_STYLE_VALUE,
    payload: {
      styleKey,
      value,
    },
  };
}

function handleSetModuleStyleValue(
  state: EditorReduxState,
  { styleKey, value }: SetModuleStyleValuePayload
): EditorReduxState {
  return {
    ...state,
    test: {
      ...state.test,
      [styleKey]: value,
    },
  };
}

const ACTION_HANDLERS = {
  [SET_MODULE_STYLE_VALUE]: handleSetModuleStyleValue,
};

export type GenericAction = {
  type: string,
  payload: {},
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
