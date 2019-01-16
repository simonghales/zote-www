// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { mediumBoldTextCss } from './typography';
import { getRem } from '../utils/measurements';
import spacing from '../config/spacing';

export const selectHeaderCss = css`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const selectHeaderTextCss = css`
  ${mediumBoldTextCss};
  position: relative;
  top: 1px;
`;

export const selectHeaderIconCss = css`
  color: ${colors.darkLightBlue};
  margin-left: ${getRem(4)};
  position: relative;
  top: 1px;

  svg {
    display: block;
    width: ${getRem(7)};
  }
`;

export const commonSidePadding = getRem(spacing.medium);

export const commonHeaderHeight = getRem(60);
