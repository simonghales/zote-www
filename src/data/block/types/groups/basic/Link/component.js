// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import type { ParsedStylesModel } from '../../../../../../parser/models';
import type { DefaultBlockProps } from '../../../props';
import { withBlockHighlighter } from '../../../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';
import { renderChildren } from '../../html/Element/component';
import { getPreviewSiteLinkPath } from '../../../../../../preview/routing/routing';

export type LinkParsedProps = DefaultBlockProps & {
  children: Node,
  content: string,
  to: string,
  zoteStyles: ParsedStylesModel,
};

class LinkComponent extends PureComponent<LinkParsedProps> {
  render() {
    const { children, content, to, zoteStyles } = this.props;
    const Element = Link;
    return React.createElement(
      Element,
      {
        className: css(zoteStyles),
        to: getPreviewSiteLinkPath(to),
      },
      renderChildren(content, children)
    );
  }
}

export default withBlockHighlighter(LinkComponent);
