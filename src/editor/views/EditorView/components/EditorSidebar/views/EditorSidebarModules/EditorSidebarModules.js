// @flow
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from './styles';
import { SlimIconButton } from '../../../../../../components/Button/Button';
import { ReduxComponentSortable } from '../../../../../../components/ComponentSortable/ComponentSortable';

const EditorSidebarModules = () => (
  <div className={styles.containerClass}>
    <div className={styles.addBlockWrapperClass}>
      <SlimIconButton icon={<FaPlus size={9} />}>Add Block</SlimIconButton>
    </div>
    <div className={styles.contentWrapperClass}>
      <ReduxComponentSortable />
    </div>
  </div>
);

export default EditorSidebarModules;
