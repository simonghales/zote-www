// @flow

import { css } from 'emotion';
import colors from './config/colors';
import fontSizes from './config/fontSizes';
import fontWeights from './config/fontWeights';
import { getEm } from './utils/measurements';

export const buttonResetCss = css`
  font: inherit;
  border: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  cursor: pointer;
`;

export const solidButtonCss = css`
  background-color: ${colors.vibrant};
  color: ${colors.white};
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${fontSizes.small}px;
  font-weight: ${fontWeights.bold};
  line-height: 1.35;
  padding: ${getEm(12, fontSizes.small)} ${getEm(14, fontSizes.small)};
  border-radius: ${getEm(25, fontSizes.small)};
`;
