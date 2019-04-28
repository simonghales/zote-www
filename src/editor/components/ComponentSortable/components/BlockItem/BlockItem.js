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
  getBlockNameWithComponents,
  getBlockTypeFromBlock,
  getNameFromBlock,
} from '../../../../../data/block/state';
import type { ReduxRootState, ReduxDataState } from '../../../../../redux/store';
import { getIconFromBlockType } from '../../../../../data/block/types/state';
import AddButton, { ADD_BLOCK_POSITIONS } from './components/AddButton/AddButton';
import type { AddBlockPositions } from './components/AddButton/AddButton';
import {
  setAddingBlockSelectedRedux,
  setHoveredBlockKeyRedux,
} from '../../../../../redux/ui/reducer';
import OpenComponentButton from './components/OpenComponentButton/OpenComponentButton';
import { getComponentsFromReduxEditorState } from '../../../../../redux/editor/state';
import { EditorUIContext } from '../../../../context/components/EditorUIContextWrapper/EditorUIContextWrapper';
import { getReduxPresentState } from '../../../../../redux/styles/state';

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
};

class BlockItem extends React.Component<Props> {
  static contextType = EditorUIContext;

  static defaultProps = {
    canContainChildren: false,
    children: undefined,
    rootBlock: false,
    componentKey: '',
  };

  handleMouseEnter = () => {
    const { blockKey } = this.props;
    const { setHoveredBlockKey } = this.context;
    setHoveredBlockKey(blockKey);
  };

  handleMouseLeave = () => {
    const { setHoveredBlockKey } = this.context;
    setHoveredBlockKey('');
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
          {componentKey && (
            <div className={styles.openComponentClass}>
              <OpenComponentButton componentKey={componentKey} />
            </div>
          )}
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

const mapStateToProps = (rootState: ReduxRootState, { blockKey }: Props) => {
  const state = getReduxPresentState(rootState);
  const components = getComponentsFromReduxEditorState(state.editor);
  const selectedComponent = getSelectedComponentSelector(rootState);
  const blocks = getBlocksFromComponent(selectedComponent);
  const block = getBlockFromBlocks(blockKey, blocks);
  const blockType = getBlockTypeFromBlock(block);
  const icon = getIconFromBlockType(blockType);
  const blockComponentImportKey = getBlockComponentImportKey(block);
  return {
    icon,
    name: getBlockNameWithComponents(block, components),
    componentKey: blockComponentImportKey,
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
