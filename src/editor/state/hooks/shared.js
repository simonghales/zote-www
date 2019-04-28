// @flow

import { useReduxState } from 'reactive-react-redux';
import type { ReduxRootState, ReduxDataState } from '../../../redux/store';
import { getReduxPresentState } from '../../../redux/styles/state';

export const useReduxPresentState = (): ReduxDataState => {
  const state: ReduxRootState = useReduxState();
  return getReduxPresentState(state);
};
