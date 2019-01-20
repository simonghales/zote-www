// @flow
import React from 'react';
import type { Node } from 'react';
import { FaParagraph, FaCube } from 'react-icons/fa';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import { getSelectedComponentSelector } from '../../../../state/reselect/component';
import { getBlocksFromComponent } from '../../../../../data/component/state';
import { getBlockFromBlocks, getNameFromBlock } from '../../../../../data/block/state';
import type { ReduxState } from '../../../../../redux/store';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  blockKey: string,
  name: string,
  selected: boolean,
  children?: Node,
  onSelect: (blockKey: string) => void,
};

const BlockItem = ({ blockKey, name, selected, children, onSelect }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.selectedClass]: selected,
      [styles.classNames.blockItemWrapperSelected]: selected,
    })}
  >
    <div
      className={cx(styles.clickableClass, {
        [styles.classNames.blockItemSelected]: selected,
      })}
      onClick={() => {
        onSelect(blockKey);
      }}
    >
      <div className={styles.iconClass}>
        <FaCube />
      </div>
      <div className={styles.nameClass}>{name}</div>
    </div>
    {children && children}
  </div>
);

BlockItem.defaultProps = {
  children: undefined,
};

const mapStateToProps = (state: ReduxState, { blockKey }: Props) => {
  const selectedComponent = getSelectedComponentSelector(state);
  const blocks = getBlocksFromComponent(selectedComponent);
  const block = getBlockFromBlocks(blockKey, blocks);
  return {
    name: getNameFromBlock(block),
  };
};

export default connect(mapStateToProps)(BlockItem);
