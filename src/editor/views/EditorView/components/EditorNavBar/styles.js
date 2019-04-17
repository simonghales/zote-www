// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import fontWeights from '../../../../../styles/config/fontWeights';

export const containerClass = css`
  background-color: #1e2431;
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 ${spacing.medium}px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.35px;

  a {
    color: #586175;
    display: inline-block;
    margin-right: 30px;
    text-decoration: none;
    transition: color 200ms ease;

    &:hover {
      color: #d5dae2;
    }
  }
`;
