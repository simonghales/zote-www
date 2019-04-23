// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../../../styles/utils/measurements';

export const rowClass = css`
  &:not(:first-of-type) {
    margin-top: ${getRem(5)};
  }
`;
