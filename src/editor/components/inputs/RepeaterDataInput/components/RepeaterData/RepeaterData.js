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
      {Array.from({ length: 3 }).map((item, index) => (
        <DataItem key={index.toString()} index={index} />
      ))}
    </div>
  </div>
);

export default RepeaterData;
