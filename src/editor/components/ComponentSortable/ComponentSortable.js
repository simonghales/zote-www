// @flow
import React from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { DUMMY_SORTABLE_BLOCKS } from './models';
import type { SortableBlockModel } from './models';
import styles from './styles';
import NestList from './components/NestList/NestList';
import BlockItem from './components/BlockItem/BlockItem';
import type { ReduxState } from '../../../redux/store';
import { getSelectedComponentSelector } from '../../state/reselect/component';
import { mapComponentBlocksToSortableBlocks } from './state';
import { getSelectedComponentSelectedBlockKey } from '../../state/reselect/ui';
import { getKeyFromComponent, getRootBlockKeyFromComponent } from '../../../data/component/state';
import { setComponentSelectedBlockKeyRedux } from '../../../redux/ui/reducer';
import { updateComponentBlocksOrderRedux } from '../../../redux/editor/reducer';
import {
  getReduxSafeAddingBlockSelectedKeyAndPosition,
  getReduxUiAddingBlockSelectedKey,
  getReduxUiAddingBlockSelectedPosition,
} from '../../../redux/ui/state';
import type { AddBlockPositions } from './components/BlockItem/components/AddButton/AddButton';
import { blockItemClassNames } from './components/BlockItem/styles';

type Props = {
  addingBlock: boolean,
  blocks: Array<SortableBlockModel>,
  componentKey: string,
  rootBlockKey: string,
  selectedBlockKey: string,
  addingBlockSelectedKey: string,
  addingBlockSelectedPosition: string,
  setComponentSelectedBlockKey: (componentKey: string, blockKey: string) => void,
  updateComponentBlocksOrder: (
    blocksOrder: BlocksOrder,
    rootBlocksKeysOrder: Array<string>,
    componentKey: string
  ) => void,
};

export type BlockOrder = {
  children: Array<string>,
};

export type BlocksOrder = {
  [string]: BlockOrder,
};

function mapBlocksOrder(items: Array<SortableBlockModel>): BlocksOrder {
  let blocks = {};
  items.forEach(item => {
    blocks[item.blockKey] = {
      children: item.children.map((childItem: SortableBlockModel) => childItem.blockKey),
    };
    const childBlocks = mapBlocksOrder(item.children);
    blocks = {
      ...blocks,
      ...childBlocks,
    };
  });
  return blocks;
}

function mapRootBlocksKeysOrder(items: Array<SortableBlockModel>): Array<string> {
  return items.map(item => item.blockKey);
}

class ComponentSortable extends React.Component<Props> {
  handleSelectBlock = (blockKey: string) => {
    const { componentKey, setComponentSelectedBlockKey } = this.props;
    setComponentSelectedBlockKey(componentKey, blockKey);
  };

  handleUpdateBlocksOrder = (items: Array<SortableBlockModel>) => {
    console.log('handleUpdateBlocksOrder', items);
    const { componentKey, updateComponentBlocksOrder } = this.props;
    const rootBlocksKeysOrder = mapRootBlocksKeysOrder(items);
    const blocksOrder = mapBlocksOrder(items);
    console.log('rootBlocksKeysOrder', rootBlocksKeysOrder);
    console.log('blocksOrder', blocksOrder);
    updateComponentBlocksOrder(blocksOrder, rootBlocksKeysOrder, componentKey);
  };

  render() {
    const {
      addingBlock,
      blocks,
      rootBlockKey,
      selectedBlockKey,
      addingBlockSelectedKey,
      addingBlockSelectedPosition,
    } = this.props;
    return (
      <div
        className={cx(styles.containerClass, {
          [blockItemClassNames.addingBlock]: addingBlock,
        })}
      >
        <BlockItem
          addingBlock={addingBlock}
          blockKey={rootBlockKey}
          selected={rootBlockKey === selectedBlockKey}
          onSelect={this.handleSelectBlock}
          rootBlock
          canContainChildren
          addingBlockSelectedKey={addingBlockSelectedKey}
          addingBlockSelectedPosition={addingBlockSelectedPosition}
        >
          <NestList
            addingBlock={addingBlock}
            blocks={blocks}
            onSelect={this.handleSelectBlock}
            onOrderChange={this.handleUpdateBlocksOrder}
            addingBlockSelectedKey={addingBlockSelectedKey}
            addingBlockSelectedPosition={addingBlockSelectedPosition}
          />
        </BlockItem>
      </div>
    );
  }
}

export default ComponentSortable;

const mapStateToProps = (state: ReduxState) => {
  const component = getSelectedComponentSelector(state);
  const componentKey = getKeyFromComponent(component);
  const selectedBlockKey = getSelectedComponentSelectedBlockKey(state);
  const blocks = mapComponentBlocksToSortableBlocks(component, selectedBlockKey);
  const rootBlockKey = getRootBlockKeyFromComponent(component);

  const [
    addingBlockSelectedKey,
    addingBlockSelectedPosition,
  ] = getReduxSafeAddingBlockSelectedKeyAndPosition(state);
  return {
    componentKey,
    blocks,
    rootBlockKey,
    selectedBlockKey,
    addingBlockSelectedKey,
    addingBlockSelectedPosition,
  };
};

const mapDispatchToProps = {
  setComponentSelectedBlockKey: (componentKey: string, blockKey: string) =>
    setComponentSelectedBlockKeyRedux(componentKey, blockKey),
  updateComponentBlocksOrder: (
    blocksOrder: BlocksOrder,
    rootBlocksKeysOrder: Array<string>,
    componentKey: string
  ) => updateComponentBlocksOrderRedux(blocksOrder, rootBlocksKeysOrder, componentKey),
};

export const ReduxComponentSortable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentSortable);
