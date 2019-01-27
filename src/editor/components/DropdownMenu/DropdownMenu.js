// @flow
import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import type { Node } from 'react';
import styles from './styles';

type Props = {
  children: Node,
  close: () => void,
};

class DropdownMenu extends React.Component<Props> {
  handleClickOutside() {
    // used by react-click-outside
    const { close } = this.props;
    close();
  }

  render() {
    const { children } = this.props;
    return <div className={styles.containerClass}>{children}</div>;
  }
}

export default enhanceWithClickOutside(DropdownMenu);
