// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SelectedBlockContext } from './context';
import type { ReduxState } from '../../../redux/store';
import { getSelectedComponentSelectedBlock } from '../../../redux/editor/state';
import type { BlockModel } from '../../../data/block/model';

type Props = {
  block: BlockModel,
  children: any,
};

const SelectedBlockContextWrapper = ({ block, children }: Props) => (
  <SelectedBlockContext.Provider value={block}>{children}</SelectedBlockContext.Provider>
);

const mapStateToProps = (state: ReduxState) => {
  const block = getSelectedComponentSelectedBlock(state);
  return {
    block,
  };
};

export default connect(mapStateToProps)(SelectedBlockContextWrapper);