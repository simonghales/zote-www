// @flow

import { css } from 'emotion';

const containerClass = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

const sidebarClass = css`
  width: 180px;
  height: 100%;
`;

const mainClass = css`
  flex: 1;
  height: 100%;
`;

export default {
  containerClass,
  sidebarClass,
  mainClass,
};
