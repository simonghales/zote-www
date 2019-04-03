// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import styles from './styles';
import { getSelectedComponentSelector } from '../../../../state/reselect/component';
import { getBlocksFromComponent } from '../../../../../data/component/state';
import {
  getBlockComponentImportKey,
  getBlockFromBlocks,
  getBlockTypeFromBlock,
  getNameFromBlock,
} from '../../../../../data/block/state';
import type { ReduxState } from '../../../../../redux/store';
import { getIconFromBlockType } from '../../../../../data/block/types/state';
import AddButton, { ADD_BLOCK_POSITIONS } from './components/AddButton/AddButton';
import type { AddBlockPositions } from './components/AddButton/AddButton';
import {
  setAddingBlockSelectedRedux,
  setHoveredBlockKeyRedux,
} from '../../../../../redux/ui/reducer';
import OpenComponentButton from './components/OpenComponentButton/OpenComponentButton';

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
  componentKey?: string,
  children?: Node,
  onSelect: (blockKey: string) => void,
  icon: Node,
  rootBlock?: boolean,
  addBlockSelect: (blockKey: string, position: AddBlockPositions) => void,
  setHovered: (blockKey: string) => void,
};

class BlockItem extends React.Component<Props> {
  static defaultProps = {
    canContainChildren: false,
    children: undefined,
    rootBlock: false,
    componentKey: '',
  };

  handleMouseEnter = () => {
    const { blockKey, setHovered } = this.props;
    setHovered(blockKey);
  };

  handleMouseLeave = () => {
    const { setHovered } = this.props;
    setHovered('');
  };

  handleOnClick = () => {
    const { blockKey, onSelect } = this.props;
    onSelect(blockKey);
  };

  render() {
    const {
      canContainChildren,
      icon,
      blockKey,
      name,
      selected,
      children,
      rootBlock,
      addingBlockSelectedKey,
      addingBlockSelectedPosition,
      addBlockSelect,
      componentKey,
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
          onClick={this.handleOnClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className={styles.iconClass}>{icon}</div>
          <div className={styles.nameClass}>{name}</div>
          {componentKey && <OpenComponentButton componentKey={componentKey} />}
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
  const blockComponentImportKey = getBlockComponentImportKey(block);
  return {
    icon,
    name: getNameFromBlock(block),
    componentKey: blockComponentImportKey,
  };
};

const mapDispatchToProps = {
  addBlockSelect: (blockKey: string, position: AddBlockPositions) =>
    setAddingBlockSelectedRedux(blockKey, position),
  setHovered: (blockKey: string) => setHoveredBlockKeyRedux(blockKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockItem);
