// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { cx } from 'emotion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styles from './styles';

type Props = {
  heading: string,
  children: Node,
  visible?: boolean,
  setVisible: (visible: boolean) => void,
};

class FormSection extends Component<Props> {
  static defaultProps = {
    visible: true,
  };

  handleToggleVisible = () => {
    const { setVisible, visible = true } = this.props;
    setVisible(!visible);
  };

  render() {
    const { heading, visible, children } = this.props;
    return (
      <div className={styles.containerClass}>
        {heading && (
          <header className={styles.headerClass} onClick={this.handleToggleVisible}>
            <div className={styles.headerTextClass}>{heading}</div>
            <div className={styles.headerIconClass}>
              {visible ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
            </div>
          </header>
        )}
        <div
          className={cx({
            [styles.hiddenBodyClass]: !visible,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default FormSection;
