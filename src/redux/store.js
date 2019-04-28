// @flow
import undoable, { includeAction } from 'redux-undo';
import { createStore, combineReducers } from 'redux';
import editorReducer, { initialEditorReduxState } from './editor/reducer';
import type { EditorReduxState } from './editor/reducer';
import uiReducer, { initialUiReduxState } from './ui/reducer';
import type { UIReduxState } from './ui/reducer';
import stylesReducer, { initialStylesReduxState } from './styles/reducer';
import type { StylesReduxState } from './styles/state';
import { FILTER_ALLOWED_ACTIONS, groupHistory } from './history';

const dataReducer = combineReducers({
  editor: editorReducer,
  styles: stylesReducer,
});

const rootReducer = combineReducers({
  data: undoable(dataReducer, {
    limit: 10,
    groupBy: groupHistory,
    filter: includeAction(FILTER_ALLOWED_ACTIONS),
  }),
  ui: uiReducer,
});

export type ReduxDataState = {
  editor: EditorReduxState,
  // ui: UIReduxState,
  styles: StylesReduxState,
};

export type ReduxRootState = {
  data: {
    past: Array<ReduxDataState>,
    future: Array<ReduxDataState>,
    present: ReduxDataState,
  },
  ui: UIReduxState,
};

const initialReduxState: ReduxRootState = {
  data: {
    past: [],
    future: [],
    present: {
      editor: initialEditorReduxState,
      styles: initialStylesReduxState,
    },
  },
  ui: initialUiReduxState,
};

const store = createStore(rootReducer, initialReduxState);

export default store;
