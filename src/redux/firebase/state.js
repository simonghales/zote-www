// @flow

import type { FirebaseReduxState } from './reducer';
import type { ReduxRootState } from '../store';

export function getLoadedSiteKeyFromFirebaseReduxState(state: FirebaseReduxState): string {
  return state.loadedSiteKey;
}

export function getLoadedSiteKeyFromRootState(state: ReduxRootState): string {
  return getLoadedSiteKeyFromFirebaseReduxState(state.firebase);
}
