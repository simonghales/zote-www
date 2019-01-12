// @flow

import { css } from 'emotion';
import fontFamilies from './config/fontFamilies';
import { getEm } from './utils/measurements';
import { smallBoldTextCss } from './shared/typography';

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

const shortInputFontSize = 13;

export const shortInputCss = css`
  ${fontFamilies.body};
  background: #dee2f0;
  font-size: ${shortInputFontSize}px;
  border: ${getEm(1, shortInputFontSize)} solid #cbd2e4;
  padding: ${getEm(3, shortInputFontSize)} ${getEm(5, shortInputFontSize)};
  border-radius: ${getEm(2, shortInputFontSize)};
  width: ${getEm(44, shortInputFontSize)};
  text-align: center;
  ${smallBoldTextCss};
`;
