// @flow

import { css } from 'emotion';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const contentClass = css`
  flex: 1;
  min-height: 0;
`;

export default {
  containerClass,
  contentClass,
};
