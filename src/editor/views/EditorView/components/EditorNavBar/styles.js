// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import fontWeights from '../../../../../styles/config/fontWeights';

export const containerClass = css`
  background-color: rgb(24, 32, 50);
  color: rgb(77, 89, 116);
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 ${spacing.medium}px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.35px;

  a {
    display: inline-block;
    margin-right: 30px;
  }
`;
