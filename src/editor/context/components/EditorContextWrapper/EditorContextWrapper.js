// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditorContext } from '../../context';
import type { ReduxRootState, ReduxDataState } from '../../../../redux/store';
import { getSelectedComponentKeySelector } from '../../../state/reselect/component';
import { getReduxPresentState } from '../../../../redux/styles/state';
import { getComponentRoute } from '../../../routing/routing';

type Props = {
  children: any,
  componentKey: string,
  history: any,
};

class EditorContextWrapper extends React.Component<Props> {
  navigateToComponent = (newComponentKey: string) => {
    const { componentKey, history } = this.props;
    history.push(getComponentRoute(newComponentKey, componentKey));
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

const mapStateToProps = (rootState: ReduxRootState) => {
  const componentKey = getSelectedComponentKeySelector(rootState);
  return {
    componentKey,
  };
};

export default withRouter(connect(mapStateToProps)(EditorContextWrapper));
