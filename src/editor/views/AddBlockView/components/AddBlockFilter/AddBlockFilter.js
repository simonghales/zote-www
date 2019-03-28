// @flow
import React from 'react';
import Input, { INPUT_THEMES } from '../../../../components/Input/Input';
import * as styles from './styles';

type Props = {
  filterInput: string,
  onChange: (value: string) => void,
};

const AddBlockFilter = ({ filterInput, onChange }: Props) => (
  <div className={styles.containerClass}>
    <Input
      value={filterInput}
      onChangeString={onChange}
      theme={INPUT_THEMES.plain}
      placeholder="Search to filter blocks"
    />
  </div>
);

export default AddBlockFilter;
