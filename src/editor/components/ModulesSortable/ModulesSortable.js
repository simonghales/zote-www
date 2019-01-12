// @flow
import React from 'react';
import styles from './styles';
import BlockItem from './components/BlockItem/BlockItem';

const ModulesSortable = () => (
  <div className={styles.containerClass}>
    <BlockItem />
    <BlockItem />
    <BlockItem selected />
  </div>
);

export default ModulesSortable;
