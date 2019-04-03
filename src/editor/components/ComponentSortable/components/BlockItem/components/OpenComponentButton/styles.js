// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';

export const buttonClass = css`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.shadeBlue};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.lightFaintShade};
  }
`;
