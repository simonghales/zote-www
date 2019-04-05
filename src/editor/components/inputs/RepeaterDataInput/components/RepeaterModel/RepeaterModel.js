// @flow
import React from 'react';
import * as styles from './styles';
import RepeaterModelInput from './components/RepeaterModelInput/RepeaterModelInput';

const RepeaterModel = () => (
  <div className={styles.containerClass}>
    <div className={styles.labelClass}>
      <span>Model</span>
    </div>
    <div>
      <RepeaterModelInput />
      <RepeaterModelInput />
      <RepeaterModelInput />
    </div>
  </div>
);

export default RepeaterModel;
