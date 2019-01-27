// @flow
import React from 'react';
import styles from './styles';

export type DropdownMenuListOptionModel = {
  label: string,
  onClick: () => void,
};

const Option = ({ label, onClick }: DropdownMenuListOptionModel) => (
  <div className={styles.optionClass}>{label}</div>
);

type Props = {
  options: Array<DropdownMenuListOptionModel>,
};

const DropdownMenuList = ({ options }: Props) => (
  <React.Fragment>
    {options.map(option => (
      <Option {...option} />
    ))}
  </React.Fragment>
);

export default DropdownMenuList;
