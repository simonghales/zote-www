// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../../../styles/utils/measurements';

const containerClass = css`
  min-width: ${getRem(60)};
`;

export default {
  containerClass,
};
