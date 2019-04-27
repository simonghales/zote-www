// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditorContext } from '../../context';
import type { ReduxHistoryState, ReduxState } from '../../../../redux/store';
import { getSelectedComponentKeySelector } from '../../../state/reselect/component';
import { getReduxPresentState } from '../../../../redux/styles/state';

type Props = {
  children: any,
  componentKey: string,
  history: any,
};

class EditorContextWrapper extends React.Component<Props> {
  navigateToComponent = (newComponentKey: string) => {
    const { componentKey, history } = this.props;
    console.log('navigate to', newComponentKey);
    history.push(`/editor/${newComponentKey}/${componentKey}`);
  };

  render() {
    const { children } = this.props;
    return (
      <EditorContext.Provider value={{ navigateToComponent: this.navigateToComponent }}>
        {children}
      </EditorContext.Provider>
    );
  }
}

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  const componentKey = getSelectedComponentKeySelector(state);
  return {
    componentKey,
  };
};

export default withRouter(connect(mapStateToProps)(EditorContextWrapper));
