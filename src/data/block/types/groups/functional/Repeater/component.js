// @flow
import React from 'react';
import type { DefaultBlockProps } from '../../../props';

export type RepeaterParsedProps = DefaultBlockProps & {
  children: any,
};

class RepeaterComponent extends React.PureComponent<RepeaterParsedProps> {
  render() {
    const { children } = this.props;
    return children;
  }
}

export default RepeaterComponent;