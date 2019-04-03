// @flow
import React from 'react';
import type { Node } from 'react';
import type { DefaultBlockProps } from '../../../props';

export type ComponentImportParsedProps = DefaultBlockProps & {
  componentReference: Node,
};

class ComponentImportComponent extends React.PureComponent<ComponentImportParsedProps> {
  render() {
    const { componentReference } = this.props;
    return <React.Fragment>{componentReference}</React.Fragment>;
  }
}

export default ComponentImportComponent;
