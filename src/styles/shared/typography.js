// @flow

import { css } from 'emotion';
import fontWeights from '../config/fontWeights';
import colors from '../config/colors';
import { getRem } from '../utils/measurements';

export const labelCss = css`
  font-weight: ${fontWeights.medium};
  font-size: 11px;
  color: ${colors.darkBlue};
  padding-left: ${getRem(5)};
  display: block;
`;

export const inactiveLabelClass = css`
  ${labelCss};
  color: ${colors.shadeBlue};
`;

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
