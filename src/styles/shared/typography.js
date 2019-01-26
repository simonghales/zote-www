// @flow

import { css } from 'emotion';
import fontWeights from '../config/fontWeights';
import colors from '../config/colors';

export const smallTextCss = css`
  font-size: 12px;
  color: ${colors.darkBlue};
`;

export const smallBoldTextCss = css`
  ${smallTextCss};
  font-weight: ${fontWeights.bold};
`;

export const mediumBoldTextCss = css`
  font-weight: ${fontWeights.bold};
  font-size: 14px;
  color: ${colors.darkBlue};
`;
