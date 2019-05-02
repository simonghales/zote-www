// @flow

import { useReduxState } from 'reactive-react-redux';
import { getLoadedSiteKeyFromRootState } from '../../../redux/firebase/state';

export const useIsFirestoreSiteLoaded = (): boolean => {
  const state = useReduxState();
  return !!getLoadedSiteKeyFromRootState(state);
};
