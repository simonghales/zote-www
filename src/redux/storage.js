// @flow
import store from './store';
import type { EditorReduxState } from './editor/reducer';
import type { StylesReduxState } from './styles/state';
import { setEditorStateRedux } from './editor/reducer';
import { setStylesStateRedux } from './styles/reducer';

export const REDUX_STORAGE_STATE = 'REDUX_STORAGE_STATE';

export type ReduxStorageState = {
  editor: EditorReduxState,
  styles: StylesReduxState,
};

export const loadState = (): ReduxStorageState | typeof undefined => {
  try {
    const serializedState = localStorage.getItem(REDUX_STORAGE_STATE);
    if (serializedState === null || !serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export function loadStateFromLocalStorage() {
  const state = loadState();
  if (!state) return;
  const { editor, styles } = state;
  store.dispatch(setEditorStateRedux(editor));
  store.dispatch(setStylesStateRedux(styles));
}

const saveState = (state: ReduxStorageState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(REDUX_STORAGE_STATE, serializedState);
  } catch {
    // ignore write errors
  }
};

export function storeReduxStateInLocalStorage() {
  const { editor, styles } = store.getState();
  saveState({ editor, styles });
}
