// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const MENU_LAYOUTS = {
  default: 'default',
  fixed: 'fixed',
};

export type MenuLayoutTypes = $Keys<typeof MENU_LAYOUTS>;

type Props = {
  className?: string,
  children: Node,
  layout?: MenuLayoutTypes,
};

class Menu extends React.Component<Props> {
  static defaultProps = {
    className: '',
    layout: MENU_LAYOUTS.default,
  };

  render() {
    const { className, children, layout } = this.props;
    return (
      <div
        className={cx(styles.containerClass, className, {
          [styles.fixedContainerClass]: layout === MENU_LAYOUTS.fixed,
        })}
      >
        {children}
      </div>
    );
  }
}

export default Menu;
