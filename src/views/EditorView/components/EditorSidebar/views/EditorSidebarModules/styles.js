// @flow

import { css } from 'emotion';
import spacing from '../../../../../../styles/config/spacing';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const addBlockWrapperClass = css`
  padding: 0 ${spacing.medium}px;
  margin: 7px 0;
  margin-left: -8px;
`;

const contentWrapperClass = css`
  flex: 1;
`;

export default {
  containerClass,
  addBlockWrapperClass,
  contentWrapperClass,
};
