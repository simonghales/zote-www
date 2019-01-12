// @flow
import React from 'react';
import styles from './styles';
import Input from '../../EmbeddedPreviewHeader';

const DimensionsSelector = () => (
  <div className={styles.dimensionsSelectorClass}>
    <div>
      <Input />
    </div>
    <div className={styles.dividerClass}>x</div>
    <div>
      <Input />
    </div>
    <div className={styles.dividerClass}>x</div>
    <div>
      <Input />
    </div>
  </div>
);

export default DimensionsSelector;
