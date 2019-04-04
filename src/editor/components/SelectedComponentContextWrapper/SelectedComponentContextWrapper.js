// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SelectedComponentContext } from './context';
import type { ReduxState } from '../../../redux/store';
import type { ComponentModel } from '../../../data/component/model';
import { getSelectedComponentSelector } from '../../state/reselect/component';

type Props = {
  children: any,
  component: ComponentModel,
};

const SelectedComponentContextWrapper = ({ children, component }: Props) => {
  if (!component) return null;
  return (
    <SelectedComponentContext.Provider value={component}>
      {children}
    </SelectedComponentContext.Provider>
  );
};

const mapStateToProps = (state: ReduxState) => {
  const component = getSelectedComponentSelector(state);
  return {
    component,
  };
};

export default connect(mapStateToProps)(SelectedComponentContextWrapper);
