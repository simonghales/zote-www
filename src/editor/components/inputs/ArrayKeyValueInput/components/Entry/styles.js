// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../../styles/utils/measurements';
import { smallTextCss } from '../../../../../../styles/shared/typography';
import fontWeights from '../../../../../../styles/config/fontWeights';

const containerClass = css`
  display: flex;
  align-items: center;
  min-height: 22px;
  margin-top: ${getRem(5)};
`;

export const ENTRY_LABEL_WIDTH = 80;

const labelWrapperClass = css`
  width: ${ENTRY_LABEL_WIDTH}px;
`;

const labelClass = css`
  ${smallTextCss};
  font-weight: ${fontWeights.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: ${getRem(5)};
  cursor: pointer;
`;

const valueWrapperClass = css`
  flex: 1;
  margin: 0 ${getRem(5)};
`;

const valueClass = css`
  ${smallTextCss};
  padding-left: ${getRem(5)};
  cursor: pointer;
`;

const buttonClass = css``;

export default {
  containerClass,
  labelWrapperClass,
  labelClass,
  valueWrapperClass,
  valueClass,
  buttonClass,
};
