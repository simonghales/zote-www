// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import type { EditorRoutingMatch } from '../routing';
import { EDITOR_ROUTE_PARAMS, getEditorRoutingMatchParam } from '../routing';
import { setSelectedComponentKeyRedux } from '../../../redux/ui/reducer';

type Props = {
  children: any,
  history: any,
  match: EditorRoutingMatch,
  setSelectedComponent: (componentKey: string, previousComponentKey: string) => void,
};

class EditorRouteHandler extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props): void {
    const nextComponentKey = getEditorRoutingMatchParam(
      EDITOR_ROUTE_PARAMS.componentKey,
      nextProps.match
    );
    const componentKey = getEditorRoutingMatchParam(
      EDITOR_ROUTE_PARAMS.componentKey,
      this.props.match
    );
    if (nextComponentKey !== componentKey) {
      const nextPreviousComponentKey = getEditorRoutingMatchParam(
        EDITOR_ROUTE_PARAMS.previousComponentKey,
        nextProps.match
      );
      const { setSelectedComponent } = this.props;
      setSelectedComponent(nextComponentKey, nextPreviousComponentKey);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  setSelectedComponent: (componentKey: string, previousComponentKey: string) =>
    setSelectedComponentKeyRedux(componentKey),
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(EditorRouteHandler)
);
