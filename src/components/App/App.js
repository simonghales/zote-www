// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import EditorView from '../../editor/views/EditorView/EditorView';
import PreviewView from '../../preview/views/PreviewView/PreviewView';
import { EDITOR_ROUTE_PATH } from '../../editor/routing/routing';
import { PREVIEW_ROUTE_PATH, PREVIEW_SITE_ROUTE_PATH } from '../../preview/routing/routing';
import PreviewSiteView from '../../preview/views/PreviewSiteView/PreviewSiteView';

const App = () => (
  <React.Fragment>
    <Route path={EDITOR_ROUTE_PATH} component={EditorView} />
    <Route path={PREVIEW_ROUTE_PATH} component={PreviewView} />
    <Route path={PREVIEW_SITE_ROUTE_PATH} component={PreviewSiteView} />
  </React.Fragment>
);

export default App;

/*


      path={`/editor/:${EDITOR_ROUTE_PARAMS.componentKey}?/:${
        EDITOR_ROUTE_PARAMS.previousComponentKey
      }?`}

 */
