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
`;

const sidebarClass = css`
  width: ${getRem(200)};
  height: 100%;
`;

const mainClass = css`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export default {
  containerClass,
  sidebarClass,
  mainClass,
};
