/* eslint-disable jsx-a11y/no-autofocus */
// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const INPUT_THEMES = {
  default: 'default',
  short: 'short',
  plain: 'plain',
  slimPlain: 'slimPlain',
};

export type inputThemes = $Keys<typeof INPUT_THEMES>;

type Props = {
  // eslint-disable-next-line react/require-default-props
  theme?: inputThemes,
  value: string,
  // eslint-disable-next-line react/require-default-props
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  // eslint-disable-next-line react/require-default-props
  type?: string,
  // eslint-disable-next-line react/require-default-props
  inputId?: string,
  // eslint-disable-next-line react/require-default-props
  placeholder?: string,
  // eslint-disable-next-line react/require-default-props
  autoFocus?: boolean,
  // eslint-disable-next-line react/require-default-props
  onChangeString?: (value: string) => void,
};

class Input extends React.Component<Props> {
  static defaultProps = {
    theme: INPUT_THEMES.default,
    type: 'text',
    inputId: '',
    placeholder: '',
    autoFocus: false,
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange, onChangeString } = this.props;
    if (onChangeString) {
      const { value } = event.target;
      onChangeString(value);
    } else if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { theme, value, type, inputId, placeholder, autoFocus } = this.props;
    return (
      <input
        className={cx(styles.inputClass, {
          [styles.inputShortClass]: theme === INPUT_THEMES.short,
          [styles.inputPlainClass]: theme === INPUT_THEMES.plain,
          [styles.inputSlimPlainClass]: theme === INPUT_THEMES.slimPlain,
        })}
        type={type}
        value={value}
        onChange={this.handleChange}
        id={inputId}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    );
  }
}

export default Input;

export const ShortInput = (props: Props) => <Input {...props} theme={INPUT_THEMES.short} />;

export const PlainInput = (props: Props) => <Input {...props} theme={INPUT_THEMES.plain} />;

export const SlimPlainInput = (props: Props) => <Input {...props} theme={INPUT_THEMES.slimPlain} />;
