// @flow
import type { Node } from 'react';
import React, { PureComponent } from 'react';
import { css, cx } from 'emotion';
import type { ParsedStylesModel } from '../../../../../../parser/models';
import { isHtmlElementVoid } from '../../../../../../utils/html';
import type { HtmlAttributesPropValue } from '../../../../props/types/model';
import { getReactPropsFromHtmlAttributes } from '../../../../props/types/state';
import type { DefaultBlockProps } from '../../../props';
import { withBlockHighlighter } from '../../../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

function renderChildren(content, children) {
  return (
    <React.Fragment>
      {content && content}
      {children && children}
    </React.Fragment>
  );
}

export type HtmlElementParsedProps = DefaultBlockProps & {
  children: any,
  element: string,
  content: Node,
  zoteStyles: ParsedStylesModel,
  htmlAttributes: HtmlAttributesPropValue,
};

class HtmlElementComponent extends PureComponent<HtmlElementParsedProps> {
  render() {
    const { element, content, children, zoteStyles, htmlAttributes } = this.props;
    const { className, ...htmlAttributesProps } = getReactPropsFromHtmlAttributes(htmlAttributes);
    const Element = element;
    return React.createElement(
      Element,
      {
        ...htmlAttributesProps,
        className: cx(css(zoteStyles), className),
      },
      isHtmlElementVoid(element) ? null : renderChildren(content, children)
    );
  }
}

export default withBlockHighlighter(HtmlElementComponent);
