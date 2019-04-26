// @flow
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';
import { SquareButton } from '../../../../../../../../../../components/Button/Button';

type Props = {
  active: boolean,
  icon: any,
  title: string,
  onSelect: () => void,
  onEdit: () => void,
};

const ComponentItem = ({ active, icon, title, onSelect, onEdit }: Props) => {
  const handleEditClicked = (event: any) => {
    event.stopPropagation();
    onEdit();
  };
  return (
    <div
      className={cx(styles.containerClass, {
        [styles.activeContainerClass]: active,
      })}
      onClick={onSelect}
    >
      <div className={styles.iconClass}>{icon}</div>
      <div className={styles.infoClass}>
        <div className={styles.titleClass}>{title}</div>
      </div>
      <div className={styles.editClass}>
        <SquareButton onClick={handleEditClicked}>
          <FaEdit size={11} />
        </SquareButton>
      </div>
    </div>
  );
};

export default ComponentItem;
