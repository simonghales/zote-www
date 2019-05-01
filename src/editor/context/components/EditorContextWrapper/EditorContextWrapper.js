// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EditorContext } from '../../context';
import type { ReduxRootState } from '../../../../redux/store';
import { getSelectedComponentKeySelector } from '../../../state/reselect/component';
import { getComponentRoute } from '../../../routing/routing';
import type { EditorRoutingMatch } from '../../../routing/routing';

type Props = {
  children: any,
  componentKey: string,
  history: any,
  match: EditorRoutingMatch,
};

class EditorContextWrapper extends React.Component<Props> {
  navigateToComponent = (newComponentKey: string) => {
    const { componentKey, history, match } = this.props;
    const { siteKey } = match.params;
    history.push(getComponentRoute(siteKey, newComponentKey, componentKey));
  };

  render() {
    const { children, match } = this.props;
    const { siteKey } = match.params;
    return (
      <EditorContext.Provider value={{ navigateToComponent: this.navigateToComponent, siteKey }}>
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
