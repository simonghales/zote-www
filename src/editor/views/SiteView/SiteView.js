// @flow
import React, { useEffect } from 'react';
import { useReduxDispatch } from 'reactive-react-redux';
import { useRouterSiteKeyParam } from '../../state/hooks/routing';
import { setSiteKeyRedux } from '../../../redux/ui/reducer';
import EditorView from '../EditorView/EditorView';

const SiteView = () => {
  const siteKey = useRouterSiteKeyParam();
  const dispatch = useReduxDispatch();
  useEffect(
    () => {
      dispatch(setSiteKeyRedux(siteKey));
    },
    [siteKey]
  );
  return <EditorView />;
};

export default SiteView;
