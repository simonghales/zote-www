// @flow
import type { Node } from 'react';
import React, { PureComponent } from 'react';
import { css } from 'emotion';
import type { ParsedStylesModel } from '../../../../../../parser/models';
import { withBlockHighlighter } from '../../../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';
import type { DefaultBlockProps } from '../../../props';

export type ContainerParsedProps = DefaultBlockProps & {
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

export default withBlockHighlighter(ContainerComponent);
