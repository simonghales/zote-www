// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import styles from './styles';

export const BUTTON_THEMES = {
  default: 'default',
  solid: 'solid',
  slimIcon: 'slimIcon',
  slimIconDarker: 'slimIconDarker',
};

export type buttonThemes = $Keys<typeof BUTTON_THEMES>;

type Props = {
  children: Node,
  // eslint-disable-next-line react/require-default-props
  icon?: Node,
  // eslint-disable-next-line react/require-default-props
  theme?: buttonThemes,
};

const Button = ({ children, icon, theme }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.solidButtonClass]: theme === BUTTON_THEMES.solid,
      [styles.slimIconButtonClass]: theme === BUTTON_THEMES.slimIcon,
      [styles.slimIconDarkerButtonClass]: theme === BUTTON_THEMES.slimIconDarker,
    })}
    type="button"
  >
    {icon && <div className={styles.classNames.buttonIcon}>{icon}</div>}
    {children}
  </button>
);

Button.defaultProps = {
  icon: null,
  theme: BUTTON_THEMES.default,
};

export default Button;

export const SolidButton = (props: Props) => <Button {...props} theme={BUTTON_THEMES.solid} />;

export const SlimIconButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.slimIcon} />
);

export const SlimIconDarkerButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.slimIconDarker} />
);
