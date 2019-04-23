// @flow
import React from 'react';
import { FaEdit, FaHome } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';
import { SquareButton } from '../../../../../../../../../../components/Button/Button';

type Props = {
  active: boolean,
  name: string,
  slug: string,
  onSelect: () => void,
};

const PageItem = ({ active, name, slug, onSelect }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.activeContainerClass]: active,
    })}
    onClick={onSelect}
  >
    <div className={styles.infoClass}>
      <div className={styles.titleClass}>{name}</div>
      <div className={styles.pathClass}>/{slug}</div>
    </div>
    <div className={styles.editClass}>
      <SquareButton>
        <FaEdit size={11} />
      </SquareButton>
    </div>
  </div>
);

export default PageItem;
