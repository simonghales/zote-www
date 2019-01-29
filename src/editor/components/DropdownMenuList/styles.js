// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../../../styles/input';
import fontWeights from '../../../styles/config/fontWeights';
import { getRem } from '../../../styles/utils/measurements';
import colors from '../../../styles/config/colors';

const optionClass = css`
  font-size: ${plainInputStyles.fontSize}px;
  font-weight: ${fontWeights.medium};
  color: ${plainInputStyles.color};
  padding: ${getRem(5)} ${getRem(10)};
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;

export default {
  optionClass,
};
