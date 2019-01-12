// @flow
import React from 'react';
import styles from './styles';
import { ShortInput } from '../../../../../Input/Input';

const getInputNumberValue = (event: SyntheticInputEvent<HTMLInputElement>): number => {
  const value = event.target.value.toString();
  return parseInt(value, 10);
};

type Props = {
  width: number,
  height: number,
  setWidth: (width: number) => void,
  setHeight: (height: number) => void,
};

const DimensionsSelector = ({ width, height, setWidth, setHeight }: Props) => (
  <div className={styles.dimensionsSelectorClass}>
    <div>
      <ShortInput
        value={width.toString()}
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
          setWidth(getInputNumberValue(event));
        }}
      />
    </div>
    <div className={styles.dividerClass}>x</div>
    <div>
      <ShortInput
        value={height.toString()}
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
          setHeight(getInputNumberValue(event));
        }}
      />
    </div>
  </div>
);

export default DimensionsSelector;
