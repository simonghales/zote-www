// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SelectedComponentContext } from './context';
import type { ReduxHistoryState, ReduxState } from '../../../redux/store';
import type { ComponentModel } from '../../../data/component/model';
import { getSelectedComponentSelector } from '../../state/reselect/component';
import { getReduxPresentState } from '../../../redux/styles/state';

type Props = {
  children: any,
  component: ComponentModel,
};

const SelectedComponentContextWrapper = ({ children, component }: Props) => (
  <SelectedComponentContext.Provider value={component}>
    {children}
  </SelectedComponentContext.Provider>
);

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  const component = getSelectedComponentSelector(state);
  return {
    component,
  };
};

export default connect(mapStateToProps)(SelectedComponentContextWrapper);
