// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../styles/utils/measurements';
import {
  commonHeaderHeight,
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../styles/shared/misc';
import colors from '../../../styles/config/colors';

const padding = getRem(spacing.medium);

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const bodyClass = css`
  margin-top: ${padding};
  flex: 1;
`;

export default {
  containerClass,
  bodyClass,
};
