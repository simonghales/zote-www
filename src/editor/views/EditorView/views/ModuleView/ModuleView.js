// @flow
import React from 'react';
import styles from './styles';
import ModuleEditor from '../../../../components/ModuleEditor/ModuleEditor';
import { ComponentEmbeddedPreview } from '../../../../components/EmbeddedPreview/EmbeddedPreview';
import SelectedBlockContextWrapper from '../../../../components/SelectedBlockContextWrapper/SelectedBlockContextWrapper';

const ModuleView = () => (
  <SelectedBlockContextWrapper>
    <div className={styles.containerClass}>
      <div className={styles.editorContainerClass}>
        <ModuleEditor />
      </div>
      <div className={styles.previewContainerClass}>
        <ComponentEmbeddedPreview />
      </div>
    </div>
  </SelectedBlockContextWrapper>
);

export default ModuleView;
