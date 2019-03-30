// @flow
import React from 'react';
import EditorSection from '../EditorSection/EditorSection';
import styles from './styles';
import ModuleEditorHeader from './components/ModuleEditorHeader/ModuleEditorHeader';

const ModuleEditor = () => (
  <div className={styles.containerClass}>
    <ModuleEditorHeader />
    <div className={styles.bodyClass}>
      <EditorSection />
    </div>
  </div>
);

export default ModuleEditor;
