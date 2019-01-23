// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { css } from 'emotion';
import type { ParsedStylesModel } from '../../../../../../parser/models';

export type TextParsedProps = {
  element: string,
  text: Node,
  zoteStyles: ParsedStylesModel,
};

class TextComponent extends PureComponent<TextParsedProps> {
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

export default TextComponent;
