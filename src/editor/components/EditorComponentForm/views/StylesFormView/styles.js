// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../../../styles/utils/measurements';

const containerClass = css`
  margin-top: ${getRem(spacing.mediumLess)};
`;

export default {
  containerClass,
};
