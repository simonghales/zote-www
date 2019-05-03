// @flow
import React from 'react';
import EditorView from '../EditorView/EditorView';
import FirebaseSiteLoader from '../../../firebase/components/FirebaseSiteLoader/FirebaseSiteLoader';

const SiteView = () => (
  <FirebaseSiteLoader loadingView={<div>loading...</div>} errorView={<div>not found...</div>}>
    <EditorView />
  </FirebaseSiteLoader>
);

export default SiteView;
