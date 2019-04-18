// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  children: any,
};

const SidebarBody = ({ children }: Props) => (
  <div className={styles.containerClass}>{children}</div>
);

export default SidebarBody;
