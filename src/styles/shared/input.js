// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../input';
import fontWeights from '../config/fontWeights';

export const plainInputContainerCss = css`
  background-color: ${plainInputStyles.backgroundColor};
  color: ${plainInputStyles.color};
  font-weight: ${fontWeights.medium};
  font-size: ${plainInputStyles.fontSize}px;
  line-height: ${plainInputStyles.fontSize}px;
  border-radius: ${plainInputStyles.borderRadius}px;
  min-height: ${plainInputStyles.minHeight}px;
`;
