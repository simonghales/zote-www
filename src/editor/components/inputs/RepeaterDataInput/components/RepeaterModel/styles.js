// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { labelCss } from '../../../../../../styles/shared/typography';

export const containerClass = css`
  border: 1px solid ${colors.lightFaintShade};
  border-radius: 3px;
  margin-top: 5px;
  padding: 0 5px 5px 5px;
`;

export const labelClass = css`
  ${labelCss};
  margin-left: -3px;
  margin-top: -8px;

  span {
    background-color: ${colors.lightBlue};
    padding: 1px 2px;
  }
`;
