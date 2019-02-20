// @flow
import React from 'react';
import styles from './styles';

type Props = {
  cssKey: string,
  value: string,
};

const CustomStyle = ({ cssKey, value }: Props) => (
  <div className={styles.containerClass}>
    <span className={styles.labelClass}>{cssKey}:</span>
    <span className={styles.valueClass}>{value};</span>
  </div>
);

export default CustomStyle;
