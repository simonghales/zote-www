// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { PREVIEW_SITE_ROUTE_PATH } from '../../routing/routing';
import PagePreview from '../../components/PagePreview/PagePreview';

const PreviewSiteView = () => (
  <React.Fragment>
    <Route exact path={`${PREVIEW_SITE_ROUTE_PATH}/:slug?`} component={PagePreview} />
  </React.Fragment>
);

export default PreviewSiteView;
