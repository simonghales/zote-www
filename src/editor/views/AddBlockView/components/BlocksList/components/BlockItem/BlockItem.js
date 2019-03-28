// @flow
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';

type Props = {
  name: string,
  icon: any,
  add: () => void,
};

const BlockItem = ({ name, icon, add }: Props) => (
  <div className={cx(styles.containerClass, styles.classNames.blockItemContainer)} onClick={add}>
    <div className={styles.iconClass}>
      {icon}
      <div className={styles.iconHoverClass}>
        <FaPlus />
      </div>
    </div>
    <div>{name}</div>
  </div>
);

export default BlockItem;
