// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import { getSelectedComponentSelector } from '../../../../state/reselect/component';
import { getBlocksFromComponent } from '../../../../../data/component/state';
import {
  getBlockFromBlocks,
  getBlockTypeFromBlock,
  getNameFromBlock,
} from '../../../../../data/block/state';
import type { ReduxState } from '../../../../../redux/store';
import { getIconFromBlockType } from '../../../../../data/block/types/state';
import AddButton, { ADD_BLOCK_POSITIONS } from './components/AddButton/AddButton';
import type { AddBlockPositions } from './components/AddButton/AddButton';
import { setAddingBlockSelectedRedux } from '../../../../../redux/ui/reducer';

function isButtonSelected(
  blockKey: string,
  position: AddBlockPositions,
  addingBlockSelectedKey: string,
  addingBlockSelectedPosition: string
): boolean {
  return blockKey === addingBlockSelectedKey && position === addingBlockSelectedPosition;
}

type Props = {
  addingBlock: boolean,
  addingBlockSelectedKey: string,
  addingBlockSelectedPosition: string,
  // eslint-disable-next-line react/no-unused-prop-types
  blockKey: string,
  name: string,
  selected: boolean,
  canContainChildren?: boolean,
  children?: Node,
  onSelect: (blockKey: string) => void,
  icon: Node,
  rootBlock?: boolean,
  addBlockSelect: (blockKey: string, position: AddBlockPositions) => void,
};

class BlockItem extends React.Component<Props> {
  static defaultProps = {
    canContainChildren: false,
    children: undefined,
    rootBlock: false,
  };

  render() {
    const {
      canContainChildren,
      icon,
      blockKey,
      name,
      selected,
      children,
      onSelect,
      rootBlock,
      addingBlockSelectedKey,
      addingBlockSelectedPosition,
      addBlockSelect,
    } = this.props;
    return (
      <div
        className={cx(styles.containerClass, {
          [styles.selectedClass]: selected,
          [styles.classNames.blockItemWrapperSelected]: selected,
        })}
      >
        {!rootBlock && (
          <div className={cx(styles.addBlockIconClass, styles.addBlockBeforeClass)}>
            <AddButton
              position={ADD_BLOCK_POSITIONS.before}
              selected={isButtonSelected(
                blockKey,
                ADD_BLOCK_POSITIONS.before,
                addingBlockSelectedKey,
                addingBlockSelectedPosition
              )}
              onClick={() => {
                addBlockSelect(blockKey, ADD_BLOCK_POSITIONS.before);
              }}
            />
          </div>
        )}
        <div
          className={cx(styles.clickableClass, {
            [styles.classNames.blockItemSelected]: selected,
          })}
          onClick={() => {
            onSelect(blockKey);
          }}
        >
          <div className={styles.iconClass}>{icon}</div>
          <div className={styles.nameClass}>{name}</div>
          {canContainChildren && (
            <div className={cx(styles.addBlockIconClass, styles.addBlockInsideClass)}>
              <AddButton
                position={ADD_BLOCK_POSITIONS.inside}
                selected={isButtonSelected(
                  blockKey,
                  ADD_BLOCK_POSITIONS.inside,
                  addingBlockSelectedKey,
                  addingBlockSelectedPosition
                )}
                onClick={() => {
                  addBlockSelect(blockKey, ADD_BLOCK_POSITIONS.inside);
                }}
              />
            </div>
          )}
        </div>
        {children && children}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, { blockKey }: Props) => {
  const selectedComponent = getSelectedComponentSelector(state);
  const blocks = getBlocksFromComponent(selectedComponent);
  const block = getBlockFromBlocks(blockKey, blocks);
  const blockType = getBlockTypeFromBlock(block);
  const icon = getIconFromBlockType(blockType);
  return {
    icon,
    name: getNameFromBlock(block),
  };
};

const mapDispatchToProps = {
  addBlockSelect: (blockKey: string, position: AddBlockPositions) =>
    setAddingBlockSelectedRedux(blockKey, position),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockItem);
