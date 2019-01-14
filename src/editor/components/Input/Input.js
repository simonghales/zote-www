// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const INPUT_THEMES = {
  default: 'default',
  short: 'short',
};

export type inputThemes = $Keys<typeof INPUT_THEMES>;

type Props = {
  // eslint-disable-next-line react/require-default-props
  theme?: inputThemes,
  value: string,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  // eslint-disable-next-line react/require-default-props
  type?: string,
};

const Input = ({ theme, value, onChange, type }: Props) => (
  <input
    className={cx(styles.inputClass, {
      [styles.inputShortClass]: theme === INPUT_THEMES.short,
    })}
    type={type}
    value={value}
    onChange={onChange}
  />
);

Input.defaultProps = {
  theme: INPUT_THEMES.default,
  type: 'text',
};

export default Input;

export const ShortInput = (props: Props) => <Input {...props} theme={INPUT_THEMES.short} />;