// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxHistoryState, ReduxState } from '../../../../../../../../../redux/store';
import { getReduxUiAddingBlock } from '../../../../../../../../../redux/ui/state';
import { getSelectedComponentSelectedBlockKey } from '../../../../../../../../state/reselect/ui';
import { getReduxPresentState } from '../../../../../../../../../redux/styles/state';

export const ADD_BLOCK_POSITIONS = {
  inside: 'inside',
  before: 'before',
  after: 'after',
};

export type AddBlockPositions = $Keys<typeof ADD_BLOCK_POSITIONS>;

type Props = {
  children: any,
  addingBlock: boolean,
  selectedBlockKey: string,
};

type State = {
  selectedPosition: AddBlockPositions,
  selectedPositionBlockKey: string,
};

class AddBlockStateWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedPosition: ADD_BLOCK_POSITIONS.inside,
      selectedPositionBlockKey: '',
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    const { addingBlock, selectedBlockKey } = nextProps;
    // eslint-disable-next-line react/destructuring-assignment
    if (addingBlock && !this.props.addingBlock) {
      this.setSelectedPosition(selectedBlockKey);
    }
  }

  setSelectedPosition(selectedBlockKey: string) {
    this.setState({
      selectedPosition: ADD_BLOCK_POSITIONS.inside,
      selectedPositionBlockKey: selectedBlockKey,
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  const selectedBlockKey = getSelectedComponentSelectedBlockKey(state);
  return {
    addingBlock: getReduxUiAddingBlock(state),
    selectedBlockKey,
  };
};

export default connect(mapStateToProps)(AddBlockStateWrapper);
