// @flow

import { css } from 'emotion';
import spacing from '../../../../../../../styles/config/spacing';
import { getRem } from '../../../../../../../styles/utils/measurements';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const addBlockWrapperClass = css`
  padding: 0 ${getRem(spacing.medium)};
  margin: ${getRem(7)} 0;
  margin-left: ${getRem(-8)};
`;

const contentWrapperClass = css`
  flex: 1;
`;

export default {
  containerClass,
  addBlockWrapperClass,
  contentWrapperClass,
};
