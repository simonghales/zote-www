// @flow
import React from 'react';
import * as styles from './styles';
import Input, { INPUT_THEMES } from '../../../../../../Input/Input';

const DataItemInput = () => (
  <div>
    <div>Label</div>
    <div>
      <Input value="Hello World" theme={INPUT_THEMES.plain} />
    </div>
  </div>
);

const DataItem = () => (
  <div className={styles.containerClass}>
    <DataItemInput />
    <DataItemInput />
    <DataItemInput />
  </div>
);

export default DataItem;
