// @flow

import { css } from 'emotion';
import colors from '../../../styles/config/colors';
import zindexes from '../../../styles/config/zindexes';

const containerClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${zindexes.addBlockView};
`;

const shadeClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const mainClass = css`
  width: 300px;
  height: 100%;
  background-color: ${colors.lightBlue};
  box-shadow: inset 1px 0 1px rgba(74, 81, 95, 0.03);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const mainHeaderClass = css``;

const mainBodyClass = css`
  flex: 1;
`;

export default {
  containerClass,
  shadeClass,
  mainClass,
  mainHeaderClass,
  mainBodyClass,
};
