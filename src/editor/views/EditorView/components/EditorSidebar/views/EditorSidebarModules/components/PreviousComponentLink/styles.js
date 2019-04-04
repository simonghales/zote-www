// @flow

import { css } from 'emotion';
import colors from '../../../../../../../../../styles/config/colors';
import fontWeights from '../../../../../../../../../styles/config/fontWeights';

export const buttonClass = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${colors.darkLightBlue};
  overflow: hidden;

  &:hover {
    color: ${colors.vibrant};
  }
`;

export const nameClass = css`
  margin-left: 4px;
  font-size: 11px;
  font-weight: ${fontWeights.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
