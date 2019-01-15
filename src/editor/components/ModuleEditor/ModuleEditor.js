// @flow
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import EditorSection from '../EditorSection/EditorSection';
import styles from './styles';

const ModuleEditor = () => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <div className={styles.headerTextClass}>Site Heading</div>
      <div className={styles.headerIconClass}>
        <FaCaretDown />
      </div>
    </header>
    <div className={styles.bodyClass}>
      <EditorSection />
    </div>
  </div>
);

export default ModuleEditor;
