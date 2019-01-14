// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import EditorView from '../../editor/views/EditorView/EditorView';
import PreviewView from '../../preview/views/PreviewView/PreviewView';

const App = () => (
  <React.Fragment>
    <Route path="/editor" component={EditorView} />
    <Route path="/preview" component={PreviewView} />
  </React.Fragment>
);

export default App;
