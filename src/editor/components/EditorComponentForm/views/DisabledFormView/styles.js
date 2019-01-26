// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../../../styles/utils/measurements';
import { smallTextCss } from '../../../../../styles/shared/typography';

const containerClass = css`
  margin-top: ${getRem(spacing.small)};
  ${smallTextCss};
`;

export default {
  containerClass,
};
