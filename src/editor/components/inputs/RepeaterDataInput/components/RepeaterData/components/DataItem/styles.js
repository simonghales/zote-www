// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';

export const containerClass = css`
  &:not(:first-child) {
    margin-top: 10px;
    border-top: 1px solid ${colors.lightFaintShade};
    padding-top: 5px;
  }
`;
