// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import type { DefaultBlockProps } from '../../../props';

export type PageComponentParsedProps = DefaultBlockProps & {
  children: Node,
};

class PageComponentComponent extends PureComponent<PageComponentParsedProps> {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default PageComponentComponent;
