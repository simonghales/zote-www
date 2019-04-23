// @flow
import React from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import { FaPlus } from 'react-icons/fa';
import styles from './styles';

export const BUTTON_THEMES = {
  default: 'default',
  solid: 'solid',
  slimSolid: 'slimSolid',
  slimIcon: 'slimIcon',
  slimIconDarker: 'slimIconDarker',
  roundIcon: 'roundIcon',
  roundIconActive: 'roundIconActive',
  square: 'square',
};

export type buttonThemes = $Keys<typeof BUTTON_THEMES>;

type Props = {
  children: Node,
  // eslint-disable-next-line react/require-default-props
  icon?: Node,
  // eslint-disable-next-line react/require-default-props
  theme?: buttonThemes,
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean,
  // eslint-disable-next-line react/require-default-props
  type?: string,
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void,
  // eslint-disable-next-line react/require-default-props
  highlighted?: boolean,
};

const Button = ({ children, icon, theme, disabled, onClick, type, highlighted }: Props) => (
  <button
    className={cx(styles.buttonClass, {
      [styles.solidButtonClass]: theme === BUTTON_THEMES.solid,
      [styles.slimSolidButtonClass]: theme === BUTTON_THEMES.slimSolid,
      [styles.slimIconButtonClass]: theme === BUTTON_THEMES.slimIcon,
      [styles.slimIconDarkerButtonClass]: theme === BUTTON_THEMES.slimIconDarker,
      [styles.roundIconButtonClass]: theme === BUTTON_THEMES.roundIcon,
      [styles.roundIconActiveButtonClass]: theme === BUTTON_THEMES.roundIconActive,
      [styles.squareButtonClass]: theme === BUTTON_THEMES.square,
      [styles.classNames.buttonHighlighted]: highlighted,
    })}
    type={type}
    disabled={!!disabled}
    onClick={onClick}
  >
    {icon && <div className={styles.classNames.buttonIcon}>{icon}</div>}
    {children}
  </button>
);

Button.defaultProps = {
  icon: null,
  theme: BUTTON_THEMES.default,
  disabled: false,
  type: 'button',
  highlighted: false,
  onClick: () => {},
};

export default Button;

export const SolidButton = (props: Props) => <Button {...props} theme={BUTTON_THEMES.solid} />;

export const SlimSolidButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.slimSolid} />
);

export const SlimIconButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.slimIcon} />
);

export const SlimAddButton = (props: Props) => (
  <SlimIconButton {...props} icon={<FaPlus size={9} />} />
);

export const SlimIconDarkerButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.slimIconDarker} />
);

export const RoundIconButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.roundIcon} />
);

export const RoundIconActiveButton = (props: Props) => (
  <Button {...props} theme={BUTTON_THEMES.roundIconActive} />
);

export const SquareButton = (props: Props) => <Button {...props} theme={BUTTON_THEMES.square} />;
