// @flow
import type { Node } from 'react';
import React, { PureComponent } from 'react';
import { css } from 'emotion';
import type { ParsedStylesModel } from '../../../../../../parser/models';

export type ContainerParsedProps = {
  element: string,
  children: Node,
  zoteStyles: ParsedStylesModel,
};

class ContainerComponent extends PureComponent<ContainerParsedProps> {
  render() {
    const { element, children, zoteStyles } = this.props;
    const Element = element;
    return React.createElement(
      Element,
      {
        className: css(zoteStyles),
      },
      children
    );
  }
}

export default ContainerComponent;
