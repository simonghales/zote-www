// @flow

import { css } from 'emotion';
import { getRem } from '../../../styles/utils/measurements';

const containerClass = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const navBarClass = css``;

const bodyClass = css`
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
`;

const sidebarClass = css`
  width: ${getRem(200)};
  height: 100%;
`;

const mainClass = css`
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export default {
  containerClass,
  bodyClass,
  sidebarClass,
  navBarClass,
  mainClass,
};
