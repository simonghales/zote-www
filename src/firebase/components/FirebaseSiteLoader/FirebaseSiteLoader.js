// @flow
import React, { useEffect, useState } from 'react';
import { useReduxDispatch } from 'reactive-react-redux';
import { fetchFirestoreSiteData } from '../../site/actions';
import { initialiseReduxStateFromFirestoreSiteData } from '../../../redux/shared/misc';
import { useRouterSiteKeyParam } from '../../../editor/state/hooks/routing';
import { useIsFirestoreSiteLoaded } from '../../../editor/state/hooks/firebase';
import { setSiteKeyRedux } from '../../../redux/ui/reducer';

async function fetchSiteDataAndStoreInRedux(siteKey: string) {
  const siteData = await fetchFirestoreSiteData(siteKey);
  if (!siteData) return Promise.reject();
  initialiseReduxStateFromFirestoreSiteData(siteKey, siteData);
  return Promise.resolve();
}

type Props = {
  children: any,
  loadingView: any,
  errorView: any,
};

const FirebaseSiteLoader = ({ children, loadingView, errorView }: Props) => {
  const siteKey = useRouterSiteKeyParam();
  const dispatch = useReduxDispatch();
  const [failedToLoad, setFailedToLoad] = useState(false);
  const siteLoaded = useIsFirestoreSiteLoaded();
  useEffect(
    () => {
      dispatch(setSiteKeyRedux(siteKey));
      fetchSiteDataAndStoreInRedux(siteKey).catch(() => {
        setFailedToLoad(true);
      });
    },
    [siteKey]
  );
  if (failedToLoad) {
    return errorView;
  }
  if (!siteLoaded) {
    return loadingView;
  }
  return children;
};

export default FirebaseSiteLoader;
