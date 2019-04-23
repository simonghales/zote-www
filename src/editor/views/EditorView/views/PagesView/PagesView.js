// @flow
import React from 'react';
import * as styles from './styles';
import PagePreview from './components/PagePreview/PagePreview';
import PageEditor from './components/PageEditor/PageEditor';

const PagesView = () => (
  <div className={styles.containerClass}>
    <div className={styles.editorClass}>
      <PageEditor />
    </div>
    <div className={styles.previewClass}>
      <PagePreview />
    </div>
  </div>
);

export default PagesView;
