// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  name: string,
  value: any,
  inactive?: boolean,
};

const FormInput = ({ name, inactive }: Props) => (
  <div>
    <header className={styles.headerClass}>
      <label
        className={cx(styles.labelClass, {
          [styles.labelInactiveClass]: inactive,
        })}
      >
        {name}
      </label>
    </header>
    <div>input...</div>
  </div>
);

FormInput.defaultProps = {
  inactive: false,
};

export default FormInput;
