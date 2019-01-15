// @flow
import React from 'react';
import styles from './styles';
import EditorSectionNav from './components/EditorSectionNav/EditorSectionNav';
import EditorSectionBody from './components/EditorSectionBody/EditorSectionBody';

const EditorSection = () => (
  <div className={styles.containerClass}>
    <EditorSectionNav />
    <div className={styles.contentClass}>
      <EditorSectionBody />
    </div>
  </div>
);

export default EditorSection;
