// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';

const containerClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const iframeClass = css`
  background: ${colors.white};
  width: 100%;
  height: 100%;
  position: absolute;
  transform-origin: center center;
  transform: scale(1);
`;

export default {
  containerClass,
  iframeClass,
};
