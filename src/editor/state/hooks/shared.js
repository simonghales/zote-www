// @flow

import { useReduxState } from 'reactive-react-redux';
import type { ReduxHistoryState, ReduxState } from '../../../redux/store';
import { getReduxPresentState } from '../../../redux/styles/state';

export const useReduxPresentState = (): ReduxState => {
  const state: ReduxHistoryState = useReduxState();
  return getReduxPresentState(state);
};
