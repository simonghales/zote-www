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
  zoteExternalUrl?: boolean,
  zoteStyles: ParsedStylesModel,
};

class LinkComponent extends PureComponent<LinkParsedProps> {
  static defaultProps = {
    zoteExternalUrl: false,
  };

  render() {
    const { children, content, to, zoteExternalUrl, zoteStyles } = this.props;
    const props: any = {
      className: css(zoteStyles),
    };
    let Element = Link;
    if (zoteExternalUrl) {
      props.href = to;
      Element = 'a';
    } else {
      props.to = to;
    }
    return React.createElement(Element, props, renderChildren(content, children));
  }
}

export default withBlockHighlighter(LinkComponent);
