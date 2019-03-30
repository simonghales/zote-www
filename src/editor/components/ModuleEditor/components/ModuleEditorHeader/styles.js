// @flow

import { css } from 'emotion';
import {
  commonHeaderHeight,
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../../../styles/shared/misc';
import { getRem } from '../../../../../styles/utils/measurements';
import spacing from '../../../../../styles/config/spacing';

const padding = getRem(spacing.medium);

export const headerClass = css`
  ${selectHeaderCss};
  height: ${commonHeaderHeight};
  border-bottom: 1px solid #e3e5f0;
  padding: 0 ${padding};
`;

export const headerTextClass = css`
  ${selectHeaderTextCss};
`;

export const headerIconClass = css`
  ${selectHeaderIconCss};
`;
