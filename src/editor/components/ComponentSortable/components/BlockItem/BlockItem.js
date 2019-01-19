// @flow
import React from 'react';
import { FaParagraph } from 'react-icons/fa';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  selected: boolean,
};

const BlockItem = ({ selected }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.classNames.blockItemSelected]: selected,
      [styles.selectedClass]: selected,
    })}
  >
    <div className={styles.clickableClass}>
      <div className={styles.iconClass}>
        <FaParagraph />
      </div>
      <div className={styles.nameClass}>Container</div>
    </div>
  </div>
);

export default BlockItem;
