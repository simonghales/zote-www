// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { css } from 'emotion';
import type { ParsedStylesModel } from '../../../../../../parser/models';

export type HeadingParsedProps = {
  element: string,
  text: Node,
  zoteStyles: ParsedStylesModel,
};

class HeadingComponent extends PureComponent<HeadingParsedProps> {
  render() {
    const { element, text, zoteStyles } = this.props;
    const Element = element;
    return React.createElement(
      Element,
      {
        className: css(zoteStyles),
      },
      text
    );
  }
}

export default HeadingComponent;
