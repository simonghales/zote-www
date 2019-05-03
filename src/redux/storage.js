// @flow
import store from './store';
import type { EditorReduxState } from './editor/reducer';
import type { StylesReduxState } from './styles/state';
import { setEditorStateRedux } from './editor/reducer';
import { setStylesStateRedux } from './styles/reducer';
import type { ReduxDataState } from './store';
import { useReduxPresentState } from '../editor/state/hooks/shared';
import { getReduxPresentState } from './styles/state';
import { getReduxUIState } from './shared/state';
import type { UIReduxState } from './ui/reducer';
import { setUIStateRedux } from './ui/reducer';

export const REDUX_STORAGE_STATE = 'REDUX_STORAGE_STATE';

export type ReduxStorageState = {
  editor: EditorReduxState,
  styles: StylesReduxState,
  ui: UIReduxState,
  timestamp: number,
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

export function storeLocalStorageState(state: ReduxStorageState) {
  const { editor, styles, timestamp } = state;
  // todo - check if timestamp is more recent than fetched data...
  store.dispatch(setEditorStateRedux(editor));
  store.dispatch(setStylesStateRedux(styles));
}

function storeLocalStorageUIState(state: ReduxStorageState) {
  const { ui } = state;
  store.dispatch(setUIStateRedux(ui));
}

export function loadStateFromLocalStorage() {
  const state = loadState();
  if (!state) return;
  storeLocalStorageState(state);
}

export function loadUIStateFromLocalStorage() {
  const state = loadState();
  if (!state) return;
  storeLocalStorageUIState(state);
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
  const rootState = store.getState();
  const state = getReduxPresentState(rootState);
  const { editor, styles } = state;
  const uiState = getReduxUIState(rootState);
  saveState({ editor, styles, ui: uiState, timestamp: Date.now() });
}
