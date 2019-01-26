// @flow

import { css } from 'emotion';
import colors from './config/colors';
import fontFamilies from './config/fontFamilies';
import { getEm, getRem } from './utils/measurements';
import { smallBoldTextCss } from './shared/typography';
import fontWeights from './config/fontWeights';

export const inputResetCss = css`
  font: inherit;
  border: 0;
  background: none;
  border-radius: 0;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const shortInputFontSize = 12;

export const shortInputCss = css`
  ${fontFamilies.body};
  background: #dee2f0;
  border: ${getEm(1, shortInputFontSize)} solid #cbd2e4;
  padding: ${getEm(3, shortInputFontSize)} ${getEm(5, shortInputFontSize)};
  border-radius: ${getEm(2, shortInputFontSize)};
  width: ${getEm(44, shortInputFontSize)};
  text-align: center;
  ${smallBoldTextCss};
`;

export const plainInputStyles = {
  minHeight: 32,
  backgroundColor: colors.inputShade,
  backgroundHoverColor: colors.inputShadeFocused,
  focusBorderColor: colors.focusColor,
  paddingVertical: 8,
  paddingHorizontal: 3,
  borderRadius: 2,
  fontSize: shortInputFontSize,
  color: colors.darkBlue,
  inactiveColor: colors.shadeBlue,
  selectedColor: colors.vibrant,
};

export const plainInputCss = css`
  background-color: ${plainInputStyles.backgroundColor};
  color: ${plainInputStyles.color};
  font-weight: ${fontWeights.medium};
  font-size: ${plainInputStyles.fontSize}px;
  line-height: ${plainInputStyles.fontSize}px;
  border-radius: ${plainInputStyles.borderRadius}px;
  padding: ${plainInputStyles.paddingVertical}px ${plainInputStyles.paddingHorizontal}px;
  border: 2px solid ${plainInputStyles.backgroundColor};

  &:focus {
    //background-color: ${colors.inputShadeFocused};
    border-color: ${plainInputStyles.focusBorderColor};
  }
`;

export const slimPlainInputCss = css`
  ${plainInputCss};
  padding: ${plainInputStyles.paddingHorizontal}px;
`;
