// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';

export const buttonClass = css`
  width: 17px;
  height: 17px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 2px 0 rgba(110, 133, 171, 0.23);
  color: ${colors.vibrant};
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 100ms ease-out, opacity 100ms ease-out;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transform: scale(1.25);
  }
`;

export const buttonSelectedClass = css`
  background-color: ${colors.vibrant};
  color: ${colors.white};
  opacity: 1;
`;
