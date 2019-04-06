// @flow
import React from 'react';
import * as styles from './styles';
import DataItem from './components/DataItem/DataItem';

const RepeaterData = () => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Data</span>
    </div>
    <div className={styles.itemsClass}>
      <DataItem />
      <DataItem />
      <DataItem />
    </div>
  </div>
);

export default RepeaterData;
