// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { FaCaretDown } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import styles from '../../styles';
import './tooltip.css';

const FormInputHeader = ({
  inputId,
  name,
  inactive,
  children,
  displayDropdown,
  onDropdownClosed,
}: {
  inputId: string,
  name: string,
  inactive: boolean,
  children?: Node,
  displayDropdown?: () => void,
  onDropdownClosed?: () => void,
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
        <Tooltip
          trigger={['click']}
          overlay={children}
          placement="bottomLeft"
          onVisibleChange={visible => {
            if (visible) {
              displayDropdown();
            } else if (onDropdownClosed) {
              onDropdownClosed();
            }
          }}
          align={{ offset: [0, -2] }}
        >
          <div className={styles.dropdownWrapperClass}>
            <div className={styles.dropdownClass}>
              <FaCaretDown size={11} />
            </div>
          </div>
        </Tooltip>
      )}
    </header>
  </div>
);

FormInputHeader.defaultProps = {
  children: undefined,
  displayDropdown: undefined,
};

export default FormInputHeader;
