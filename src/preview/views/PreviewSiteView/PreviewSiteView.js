// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { PREVIEW_SITE_ROUTE_PATH } from '../../routing/routing';
import PagePreview from '../../components/PagePreview/PagePreview';
import FirebaseSiteLoader from '../../../firebase/components/FirebaseSiteLoader/FirebaseSiteLoader';

const PreviewSiteView = () => (
  <FirebaseSiteLoader loadingView={<div>loading...</div>} errorView={<div>loading...</div>}>
    <Route exact path={`${PREVIEW_SITE_ROUTE_PATH}/:slug?`} component={PagePreview} />
  </FirebaseSiteLoader>
);

export default PreviewSiteView;
