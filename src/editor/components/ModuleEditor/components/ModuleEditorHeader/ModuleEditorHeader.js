// @flow
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import * as styles from './styles';
import { useGetSelectedBlock } from '../../../SelectedBlockContextWrapper/context';
import { getBlockName } from '../../../../../data/block/state';

const ModuleEditorHeader = () => {
  const block = useGetSelectedBlock();
  const name = getBlockName(block);
  return (
    <header className={styles.headerClass}>
      <div className={styles.headerTextClass}>{name}</div>
      <div className={styles.headerIconClass}>
        <FaCaretDown />
      </div>
    </header>
  );
};

export default ModuleEditorHeader;
