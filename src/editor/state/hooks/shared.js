// @flow

import { useReduxState } from 'reactive-react-redux';
import type { ReduxRootState, ReduxDataState } from '../../../redux/store';
import { getReduxPresentState } from '../../../redux/styles/state';
import type { EditorReduxState } from '../../../redux/editor/reducer';
import type {StylesReduxState} from '../../../redux/styles/state';

export const useReduxPresentState = (): ReduxDataState => {
  const state: ReduxRootState = useReduxState();
  return getReduxPresentState(state);
};

export const useEditorState = (): EditorReduxState => {
  const state: ReduxDataState = useReduxPresentState();
  return state.editor;
};

export const useStylesState = (): StylesReduxState => {
  const state: ReduxDataState = useReduxPresentState();
  return state.styles;
};
