// @flow
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import * as styles from './styles';

type Props = {
  title: string,
};

const EditorHeader = ({ title }: Props) => (
  <header className={styles.headerClass}>
    <div className={styles.titleClass}>{title}</div>
    <div className={styles.iconClass}>
      <FaCaretDown />
    </div>
  </header>
);

export default EditorHeader;
