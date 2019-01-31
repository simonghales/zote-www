// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { FaCaretDown } from 'react-icons/fa';
import styles from '../../styles';

const FormInputHeader = ({
  inputId,
  name,
  inactive,
  children,
  displayDropdown,
}: {
  inputId: string,
  name: string,
  inactive: boolean,
  children?: Node,
  displayDropdown?: () => void,
}) => (
  <div className={styles.headerWrapperClass}>
    <header className={styles.headerClass}>
      <label
        className={cx(styles.labelClass, {
          [styles.labelInactiveClass]: inactive,
        })}
        htmlFor={inputId}
      >
        {name}
      </label>
      {displayDropdown && (
        <div className={styles.dropdownWrapperClass}>
          <div className={styles.dropdownClass} onClick={displayDropdown}>
            <FaCaretDown size={11} />
          </div>
        </div>
      )}
    </header>
    {children}
  </div>
);

FormInputHeader.defaultProps = {
  children: undefined,
  displayDropdown: undefined,
};

export default FormInputHeader;
