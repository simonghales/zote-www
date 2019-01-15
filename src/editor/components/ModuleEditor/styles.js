// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../styles/utils/measurements';
import {
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../styles/shared/misc';

const padding = getRem(spacing.medium);

const containerClass = css`
  height: 100%;
  padding: ${getRem(51)} 0 0 0;
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  ${selectHeaderCss};
  padding: 0 ${padding};
`;

const headerTextClass = css`
  ${selectHeaderTextCss};
`;

const headerIconClass = css`
  ${selectHeaderIconCss};
`;

const bodyClass = css`
  margin-top: ${getRem(10)};
  flex: 1;
`;

export default {
  containerClass,
  headerClass,
  headerTextClass,
  headerIconClass,
  bodyClass,
};
