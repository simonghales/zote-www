// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';

export type ComponentParsedProps = {
  children: Node,
};

class ComponentComponent extends PureComponent<ComponentParsedProps> {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default ComponentComponent;
