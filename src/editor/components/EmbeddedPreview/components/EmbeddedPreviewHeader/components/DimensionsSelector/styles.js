// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../../../styles/utils/measurements';

const dimensionsSelectorClass = css`
  display: flex;
`;

const dividerClass = css`
  margin: 0 ${getRem(5)};
  font-size: 12px;
  color: #8498ba;
  display: flex;
  align-items: center;
  position: relative;
  top: -1px;
`;

export default {
  dimensionsSelectorClass,
  dividerClass,
};
