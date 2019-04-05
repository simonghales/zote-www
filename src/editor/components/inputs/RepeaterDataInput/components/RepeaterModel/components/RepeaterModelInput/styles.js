// @flow

import { css } from 'emotion';

export const containerClass = css`
  display: flex;

  &:not(:first-child) {
    margin-top: 5px;
  }
`;

export const labelClass = css`
  flex: 1;
  margin-right: 5px;
`;

export const typeClass = css`
  flex: 1;
  margin-right: 5px;
`;
