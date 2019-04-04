// @flow

import { css } from 'emotion';
import spacing from '../../../../../../../styles/config/spacing';
import { getRem } from '../../../../../../../styles/utils/measurements';

const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const optionsWrapperClass = css`
  padding: 0 ${getRem(7)};
  margin: ${getRem(7)} 0;
  //margin-left: ${getRem(-8)};
  display: flex;
  justify-content: space-between;
`;

const previousComponentWrapperClass = css`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const addBlockWrapperClass = css``;

const contentWrapperClass = css`
  flex: 1;
`;

export default {
  containerClass,
  optionsWrapperClass,
  previousComponentWrapperClass,
  addBlockWrapperClass,
  contentWrapperClass,
};
