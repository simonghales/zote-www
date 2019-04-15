// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';

export const containerClass = css`
  padding: ${spacing.small}px;
  padding-top: 0;
`;

export const itemClass = css`
  &:not(:first-of-type) {
    margin-top: ${spacing.smallLess}px;
  }
`;
