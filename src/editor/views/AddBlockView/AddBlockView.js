// @flow
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setAddingBlockRedux } from '../../../redux/ui/reducer';
import AddBlockFilter from './components/AddBlockFilter/AddBlockFilter';
import BlocksList from './components/BlocksList/BlocksList';
import type { ReduxHistoryState, ReduxState } from '../../../redux/store';
import {
  getReduxUiAddingBlockSelectedKey,
  getReduxUiAddingBlockSelectedPosition,
} from '../../../redux/ui/state';
import { generateBlockTypeBlock } from '../../../data/block/types/generate';
import { addBlockToComponentRedux } from '../../../redux/editor/reducer';
import type { BlockModel } from '../../../data/block/model';
import type { AddBlockPositions } from '../../components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { getSelectedComponentKeySelector } from '../../state/reselect/component';
import { getReduxSafeAddingBlockSelectedKeyAndPosition } from '../../../redux/shared/state';
import { getReduxPresentState } from '../../../redux/styles/state';

type Props = {
  componentKey: string,
  addingBlockSelectedKey: string,
  addingBlockSelectedPosition: AddBlockPositions,
  addBlockToComponent: (
    componentKey: string,
    block: BlockModel,
    selectedBlockKey: string,
    selectedPosition: AddBlockPositions
  ) => void,
  closeAddingBlock: () => void,
};

type State = {
  filter: string,
};

class AddBlockView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handleFilterUpdate = (value: string) => {
    this.setState({
      filter: value,
    });
  };

  handleShadeClicked = () => {
    const { closeAddingBlock } = this.props;
    closeAddingBlock();
  };

  handleAddBlock = (
    blockTypeKey: string,
    generateProps?: {
      [string]: any,
    } = {}
  ) => {
    const {
      componentKey,
      addingBlockSelectedKey,
      addingBlockSelectedPosition,
      addBlockToComponent,
      closeAddingBlock,
    } = this.props;
    const block = generateBlockTypeBlock(blockTypeKey, generateProps);
    addBlockToComponent(componentKey, block, addingBlockSelectedKey, addingBlockSelectedPosition);
    closeAddingBlock();
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={styles.containerClass}>
        <div className={styles.shadeClass} onClick={this.handleShadeClicked} />
        <div className={styles.mainClass}>
          <header className={styles.mainHeaderClass}>
            <AddBlockFilter filterInput={filter} onChange={this.handleFilterUpdate} />
          </header>
          <section className={styles.mainBodyClass}>
            <BlocksList addBlock={this.handleAddBlock} filter={filter} />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  const componentKey = getSelectedComponentKeySelector(state);
  const [
    addingBlockSelectedKey,
    addingBlockSelectedPosition,
  ] = getReduxSafeAddingBlockSelectedKeyAndPosition(state);
  return {
    componentKey,
    addingBlockSelectedKey,
    addingBlockSelectedPosition,
  };
};

const mapDispatchToProps = {
  addBlockToComponent: (
    componentKey: string,
    block: BlockModel,
    selectedBlockKey: string,
    selectedPosition: AddBlockPositions
  ) => addBlockToComponentRedux(componentKey, block, selectedBlockKey, selectedPosition),
  closeAddingBlock: () => setAddingBlockRedux(false),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlockView);
