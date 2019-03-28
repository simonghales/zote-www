// @flow
import React from 'react';
import { FaArrowDown, FaArrowLeft } from 'react-icons/fa';
import { cx } from 'emotion';
import * as styles from './styles';

export const ADD_BLOCK_POSITIONS = {
  before: 'before',
  inside: 'inside',
};

export type AddBlockPositions = $Keys<typeof ADD_BLOCK_POSITIONS>;

type Props = {
  position: AddBlockPositions,
  selected: boolean,
  onClick: () => void,
};

const AddButton = ({ position, selected, onClick }: Props) => (
  <div
    className={cx(styles.buttonClass, {
      [styles.buttonSelectedClass]: selected,
    })}
    onClick={event => {
      event.stopPropagation();
      onClick();
    }}
  >
    {position === ADD_BLOCK_POSITIONS.inside ? <FaArrowDown /> : <FaArrowLeft />}
  </div>
);

export default AddButton;
