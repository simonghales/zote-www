// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import styles from '../../styles';

const FormColumn = ({ children, columns }: { children: Node, columns: number }) => (
  <div
    className={cx(styles.columnClass, {
      [styles.sharedRowColumnClass]: columns < 4, // 4 is full
    })}
    style={{
      gridColumn: `span ${columns}`,
    }}
  >
    {children}
  </div>
);

export default FormColumn;
