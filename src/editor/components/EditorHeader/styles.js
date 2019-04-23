// @flow

import { css } from 'emotion';
import { getRem } from '../../../styles/utils/measurements';
import spacing from '../../../styles/config/spacing';
import {
  commonHeaderHeight,
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../styles/shared/misc';

export const mediumPadding = getRem(spacing.medium);

export const headerClass = css`
  ${selectHeaderCss};
  height: ${commonHeaderHeight};
  border-bottom: 1px solid #e3e5f0;
  padding: 0 ${mediumPadding};
`;

export const titleClass = css`
  ${selectHeaderTextCss};
`;

export const iconClass = css`
  ${selectHeaderIconCss};
`;
