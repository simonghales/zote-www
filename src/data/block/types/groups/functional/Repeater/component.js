// @flow
import React from 'react';
import type { DefaultBlockProps } from '../../../props';
import { withBlockHighlighter } from '../../../../../../preview/components/BlockHighlighterWrapper/BlockHighlighterWrapper';

export type RepeaterParsedProps = DefaultBlockProps & {
  children: any,
};

class RepeaterComponent extends React.PureComponent<RepeaterParsedProps> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default withBlockHighlighter(RepeaterComponent);
