// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { labelCss } from '../../../../../../styles/shared/typography';

export const containerClass = css`
  border: 1px solid ${colors.lightFaintShade};
  border-radius: 3px;
  margin-top: 10px;
  padding: 0 5px 5px 5px;
`;

export const labelClass = css`
  ${labelCss};
  margin-top: -8px;
  text-align: center;

  span {
    background-color: ${colors.lightBlue};
    padding: 1px 2px;
  }
`;

export const footerClass = css`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
