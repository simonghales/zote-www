// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { EDITOR_ROUTE_PATH } from '../../editor/routing/routing';
import { PREVIEW_WRAPPER_PATH } from '../../preview/routing/routing';
import PreviewWrapperView from '../../preview/views/PreviewWrapperView/PreviewWrapperView';
import SiteView from '../../editor/views/SiteView/SiteView';

const App = () => (
  <React.Fragment>
    <Route path={EDITOR_ROUTE_PATH} component={SiteView} />
    <Route path={PREVIEW_WRAPPER_PATH} component={PreviewWrapperView} />
  </React.Fragment>
);

export default App;
