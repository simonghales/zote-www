// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  children: any,
};

const SidebarHeader = ({ children }: Props) => (
  <header className={styles.headerClass}>
    <div className={styles.headingClass}>{children}</div>
  </header>
);

export default SidebarHeader;
