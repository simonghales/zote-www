// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditorContext } from '../../context';
import type { ReduxRootState } from '../../../../redux/store';
import { getSelectedComponentKeySelector } from '../../../state/reselect/component';
import { getComponentRoute } from '../../../routing/routing';
import { getSiteKeyFromRootReduxState } from '../../../../redux/ui/state';

type Props = {
  children: any,
  componentKey: string,
  siteKey: string,
  history: any,
};

class EditorContextWrapper extends React.Component<Props> {
  navigateToComponent = (newComponentKey: string) => {
    const { componentKey, history, siteKey } = this.props;
    history.push(getComponentRoute(siteKey, newComponentKey, componentKey));
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
  const siteKey = getSiteKeyFromRootReduxState(rootState);
  return {
    componentKey,
    siteKey,
  };
};

export default withRouter(connect(mapStateToProps)(EditorContextWrapper));
