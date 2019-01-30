// @flow
import React from 'react';
import type { Node } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  className?: string,
  children: Node,
  close: () => void,
};

class Menu extends React.Component<Props> {
  static defaultProps = {
    className: '',
  };

  handleClickOutside() {
    // used by react-click-outside
    const { close } = this.props;
    close();
  }

  render() {
    const { className, children } = this.props;
    return <div className={cx(styles.containerClass, className)}>{children}</div>;
  }
}

export default enhanceWithClickOutside(Menu);
