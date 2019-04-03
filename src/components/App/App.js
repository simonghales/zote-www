// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import EditorView from '../../editor/views/EditorView/EditorView';
import PreviewView from '../../preview/views/PreviewView/PreviewView';
import { EDITOR_ROUTE_PARAMS } from '../../editor/routing/routing';

const App = () => (
  <React.Fragment>
    <Route
      path={`/editor/:${EDITOR_ROUTE_PARAMS.componentKey}?/:${
        EDITOR_ROUTE_PARAMS.previousComponentKey
      }?`}
      component={EditorView}
    />
    <Route path="/preview" component={PreviewView} />
  </React.Fragment>
);

export default App;
