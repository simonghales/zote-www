// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../../../styles/utils/measurements';

export const buttonWrapperClass = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 ${getRem(7)};
  margin: ${getRem(7)} 0;
`;
