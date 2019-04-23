// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  children: any,
};

const FormSectionRow = ({ children }: Props) => <div className={styles.rowClass}>{children}</div>;

export default FormSectionRow;
