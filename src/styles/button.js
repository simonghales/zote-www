// @flow

import { css } from 'emotion';
import colors from './config/colors';
import fontSizes from './config/fontSizes';
import fontWeights from './config/fontWeights';
import { getEm } from './utils/measurements';
import { plainInputStyles } from './input';

export const buttonResetCss = css`
  font: inherit;
  border: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  cursor: pointer;
`;

export const solidButtonColorsCss = css`
  background-color: ${colors.vibrant};
  border-color: ${colors.vibrant};
  color: ${colors.white};

  &:focus {
    border-color: ${plainInputStyles.focusBorderColor};
  }

  &:disabled {
    background: ${colors.lightFaintShade};
    border-color: ${colors.lightFaintShade};
    color: ${colors.shadeBlue};
  }
`;

export const solidButtonCss = css`
  ${solidButtonColorsCss};
  border: 2px solid ${colors.vibrant};
  color: ${colors.white};
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${fontSizes.small}px;
  font-weight: ${fontWeights.bold};
  line-height: 1.35;
  padding: ${getEm(10, fontSizes.small)} ${getEm(12, fontSizes.small)};
  border-radius: ${getEm(25, fontSizes.small)};

  &:disabled {
    cursor: default;
  }
`;

export const slimSolidButtonCss = css`
  ${solidButtonCss};
  font-size: 11px;
  line-height: 1;
  padding: ${getEm(3, fontSizes.small)} ${getEm(5, fontSizes.small)};
`;

export const roundIconButtonCss = css`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.shadeBlue};
  border: 2px solid transparent;

  svg {
    display: block;
  }

  &:focus,
  &:hover {
    background-color: ${colors.vibrant};
    border-color: ${colors.vibrant};
    color: ${colors.white};
  }

  &:focus {
    border-color: ${plainInputStyles.focusBorderColor};
  }

  &:disabled {
    background: none;
    border-color: transparent;
    cursor: default;
    color: ${colors.shadeBlue};
    opacity: 0.5;
  }
`;

export const roundIconActiveButtonCss = css`
  ${roundIconButtonCss};
  background-color: ${colors.vibrant};
  border-color: ${colors.vibrant};
  color: ${colors.white};
`;
