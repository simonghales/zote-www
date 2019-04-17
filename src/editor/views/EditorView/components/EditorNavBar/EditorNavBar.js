// @flow
import React from 'react';
import * as styles from './styles';

const EditorNavBar = () => (
  <nav className={styles.containerClass}>
    <a>Dashboard</a>
    <a>Pages</a>
    <a>Components</a>
    <a>Mixins</a>
  </nav>
);

export default EditorNavBar;
