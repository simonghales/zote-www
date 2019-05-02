// @flow
import React, { useEffect, useState } from 'react';
import { useReduxDispatch } from 'reactive-react-redux';
import { useRouterSiteKeyParam } from '../../state/hooks/routing';
import { setSiteKeyRedux } from '../../../redux/ui/reducer';
import EditorView from '../EditorView/EditorView';
import { fetchFirestoreSiteData } from '../../../firebase/site/actions';
import { useIsFirestoreSiteLoaded } from '../../state/hooks/firebase';
import { initialiseReduxStateFromFirestoreSiteData } from '../../../redux/shared/misc';

async function fetchSiteDataAndStoreInRedux(siteKey: string) {
  const siteData = await fetchFirestoreSiteData(siteKey);
  if (!siteData) return Promise.reject();
  initialiseReduxStateFromFirestoreSiteData(siteKey, siteData);
  return Promise.resolve();
}

const SiteView = () => {
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
    return <div>TODO... ERROR VIEW</div>;
  }
  if (!siteLoaded) {
    return <div>Loading...</div>;
  }
  return <EditorView />;
};

export default SiteView;
