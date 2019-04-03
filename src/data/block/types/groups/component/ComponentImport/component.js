// @flow
import React from 'react';
import type { Node } from 'react';
import type { DefaultBlockProps } from '../../../props';

export type ComponentImportParsedProps = DefaultBlockProps & {
  children: Node,
};

class ComponentImportComponent extends React.PureComponent<ComponentImportParsedProps> {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default ComponentImportComponent;
