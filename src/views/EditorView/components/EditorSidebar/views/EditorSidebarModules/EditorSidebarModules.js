// @flow
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from './styles';
import { SlimIconButton } from '../../../../../../editor/components/Button/Button';
import ModulesSortable from '../../../../../../editor/components/ModulesSortable/ModulesSortable';

const EditorSidebarModules = () => (
  <div className={styles.containerClass}>
    <div className={styles.addBlockWrapperClass}>
      <SlimIconButton icon={<FaPlus size={9} />}>Add Block</SlimIconButton>
    </div>
    <div className={styles.contentWrapperClass}>
      <ModulesSortable />
    </div>
  </div>
);

export default EditorSidebarModules;
