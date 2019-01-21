// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import type { ParsedStylesModel } from '../../../../../../parser/models';

export type HeadingParsedProps = {
  element: string,
  text: Node,
  zoteStyles: ParsedStylesModel,
};

class HeadingComponent extends PureComponent<HeadingParsedProps> {
  render() {
    const { element, text } = this.props;
    const Element = element;
    return React.createElement(Element, {}, text);
  }
}

export default HeadingComponent;
