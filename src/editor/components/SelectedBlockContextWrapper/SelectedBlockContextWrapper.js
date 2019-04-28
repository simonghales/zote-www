// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SelectedBlockContext } from './context';
import type { ReduxRootState, ReduxDataState } from '../../../redux/store';
import type { BlockModel } from '../../../data/block/model';
import { getSelectedComponentSelectedBlock } from '../../state/reselect/ui';
import { getReduxPresentState } from '../../../redux/styles/state';

type Props = {
  block: BlockModel,
  children: any,
};

const SelectedBlockContextWrapper = ({ block, children }: Props) => (
  <SelectedBlockContext.Provider value={block}>{children}</SelectedBlockContext.Provider>
);

const mapStateToProps = (rootState: ReduxRootState) => {
  const block = getSelectedComponentSelectedBlock(rootState);
  return {
    block,
  };
};

export default connect(mapStateToProps)(SelectedBlockContextWrapper);
