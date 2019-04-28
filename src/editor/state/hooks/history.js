// @flow

import { useReduxState } from 'reactive-react-redux';
import type { ReduxRootState } from '../../../redux/store';

export const useCanUndo = () => {
  const state: ReduxRootState = useReduxState();
  return state.data.past.length > 0;
};

export const useCanRedo = () => {
  const state: ReduxRootState = useReduxState();
  return state.data.future.length > 0;
};
