// @flow
import React from 'react';
import styles from './styles';
import EditorSidebar from './components/EditorSidebar/EditorSidebar';
import ModuleView from './views/ModuleView/ModuleView';

const EditorView = () => (
  <div className={styles.containerClass}>
    <div className={styles.sidebarClass}>
      <EditorSidebar />
    </div>
    <div className={styles.mainClass}>
      <ModuleView />
    </div>
  </div>
);

export default EditorView;
