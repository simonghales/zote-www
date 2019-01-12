// @flow
import React from 'react';
import styles from './styles';
import ModuleEditor from '../../../../editor/components/ModuleEditor/ModuleEditor';
import EmbeddedPreview from '../../../../editor/components/EmbeddedPreview/EmbeddedPreview';

const ModuleView = () => (
  <div className={styles.containerClass}>
    <div className={styles.editorContainerClass}>
      <ModuleEditor />
    </div>
    <div className={styles.previewContainerClass}>
      <EmbeddedPreview />
    </div>
  </div>
);

export default ModuleView;
