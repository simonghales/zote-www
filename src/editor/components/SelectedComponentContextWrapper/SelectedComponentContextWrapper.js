// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SelectedComponentContext } from './context';
import type { ReduxRootState, ReduxDataState } from '../../../redux/store';
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

const mapStateToProps = (rootState: ReduxRootState) => {
  const component = getSelectedComponentSelector(rootState);
  return {
    component,
  };
};

export default connect(mapStateToProps)(SelectedComponentContextWrapper);
