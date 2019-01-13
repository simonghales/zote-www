// @flow

import { css } from 'emotion';
import colors from '../../../styles/config/colors';

const containerClass = css`
  background-color: ${colors.lightishBlue};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const bodyClass = css`
  flex: 1;
  overflow: hidden;
`;

export default {
  containerClass,
  bodyClass,
};
