// @flow

import { css } from 'emotion';
import colors from '../../../../../../../styles/config/colors';
import fontWeights from '../../../../../../../styles/config/fontWeights';

export const containerClass = css`
  display: flex;
  align-items: center;
`;

export const smallButtonClass = css`
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #586175;
`;

export const disabledButtonClass = css`
  cursor: default;
  opacity: 0.35;
`;

export const enabledButtonClass = css`
  &:hover {
    color: #d5dae2;
  }
`;

export const saveChangesClass = css`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.vibrant};
  color: #ffffff;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.35px;
  padding: 0 15px;
  cursor: pointer;
  min-width: 115px;
  text-align: center;
`;

export const saveChangesDisabledClass = css`
  cursor: default;
  background-color: rgb(37, 44, 60);
  color: rgb(72, 80, 98);
`;
