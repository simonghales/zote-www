// @flow

import { useReduxState } from 'reactive-react-redux';
import type { ReduxHistoryState } from '../../../redux/store';

export const useCanUndo = () => {
  const state: ReduxHistoryState = useReduxState();
  return state.past.length > 0;
};

export const useCanRedo = () => {
  const state: ReduxHistoryState = useReduxState();
  return state.future.length > 0;
};
