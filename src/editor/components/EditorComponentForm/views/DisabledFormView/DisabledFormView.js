// @flow

import React from 'react';
import styles from './styles';

type Props = {
  message: string,
};

const DisabledFormView = ({ message }: Props) => (
  <div className={styles.containerClass}>
    <div>{message}</div>
  </div>
);

export default DisabledFormView;
