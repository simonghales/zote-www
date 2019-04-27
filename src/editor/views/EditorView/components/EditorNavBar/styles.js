// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import fontWeights from '../../../../../styles/config/fontWeights';

export const containerClass = css`
  background-color: #1e2431;
  height: 34px;
  display: flex;
  justify-content: space-between;
`;

export const navClass = css`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.medium}px 0 ${spacing.medium - 5}px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.35px;
`;

export const linkClass = css`
  color: #586175;
  margin-right: 20px;
  text-decoration: none;
  transition: color 200ms ease;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${colors.vibrant};
    visibility: hidden;
  }

  &:hover {
    color: #d5dae2;
  }
`;

export const activeLinkClass = css`
  color: #d5dae2;

  &::before {
    visibility: visible;
  }
`;

export const optionsClass = css`
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
`;

export const saveChangesClass = css`
  height: 34px;
  display: flex;
  align-items: center;
  background-color: ${colors.vibrant};
  color: #ffffff;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.35px;
  padding: 0 15px;
  cursor: pointer;
`;
