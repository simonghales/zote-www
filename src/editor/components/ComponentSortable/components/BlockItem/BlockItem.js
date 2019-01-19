// @flow
import React from 'react';
import type { Node } from 'react';
import { FaParagraph } from 'react-icons/fa';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  selected: boolean,
  children?: Node,
};

const BlockItem = ({ selected, children }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.selectedClass]: selected,
    })}
  >
    <div
      className={cx(styles.clickableClass, {
        [styles.classNames.blockItemSelected]: selected,
      })}
    >
      <div className={styles.iconClass}>
        <FaParagraph />
      </div>
      <div className={styles.nameClass}>Container</div>
    </div>
    {children && children}
  </div>
);

BlockItem.defaultProps = {
  children: undefined,
};

export default BlockItem;
