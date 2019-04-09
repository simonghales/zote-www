// @flow
import React from 'react';
import styles from './styles';

export type DropdownMenuListOptionModel = {
  icon?: any,
  label: string,
  onClick: () => void,
};

const Option = ({ icon, label, onClick }: DropdownMenuListOptionModel) => (
  <div className={styles.optionClass} onClick={onClick}>
    {icon && <div className={styles.iconClass}>{icon}</div>}
    {label}
  </div>
);

type Props = {
  options: Array<DropdownMenuListOptionModel>,
};

const DropdownMenuList = ({ options }: Props) => (
  <React.Fragment>
    {options.map(option => (
      <Option {...option} key={option.label} />
    ))}
  </React.Fragment>
);

export default DropdownMenuList;
