// @flow
import undoable from 'redux-undo';
import { createStore, combineReducers } from 'redux';
import editorReducer, { initialEditorReduxState } from './editor/reducer';
import type { EditorReduxState } from './editor/reducer';
import uiReducer, { initialUiReduxState } from './ui/reducer';
import type { UIReduxState } from './ui/reducer';
import stylesReducer, { initialStylesReduxState } from './styles/reducer';
import type { StylesReduxState } from './styles/state';

const rootReducer = undoable(
  combineReducers({
    editor: editorReducer,
    ui: uiReducer,
    styles: stylesReducer,
  }),
  {
    limit: 10,
  }
);

export type ReduxState = {
  editor: EditorReduxState,
  ui: UIReduxState,
  styles: StylesReduxState,
};

export type ReduxHistoryState = {
  past: Array<ReduxState>,
  future: Array<ReduxState>,
  present: ReduxState,
};

const initialReduxState: ReduxState = {
  editor: initialEditorReduxState,
  ui: initialUiReduxState,
  styles: initialStylesReduxState,
};

const store = createStore(rootReducer, initialReduxState);

export default store;
