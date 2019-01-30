// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../input';
import colors from '../config/colors';
import fontWeights from '../config/fontWeights';
import { getRem } from '../utils/measurements';

export const selectableOptionCss = css`
  font-size: ${plainInputStyles.fontSize}px;
  font-weight: ${fontWeights.medium};
  color: ${plainInputStyles.color};
  padding: ${getRem(5)} ${getRem(10)};
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;
