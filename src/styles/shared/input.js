// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../input';
import fontWeights from '../config/fontWeights';
import {getRem} from '../utils/measurements';

export const outlineContainerCss = css`
  border: 1px solid ${plainInputStyles.backgroundColor};
  padding: ${getRem(5)};
  border-radius: ${plainInputStyles.borderRadius}px;
`;

export const plainInputContainerCss = css`
  background-color: ${plainInputStyles.backgroundColor};
  color: ${plainInputStyles.color};
  font-weight: ${fontWeights.medium};
  font-size: ${plainInputStyles.fontSize}px;
  line-height: ${plainInputStyles.fontSize}px;
  border-radius: ${plainInputStyles.borderRadius}px;
  min-height: ${plainInputStyles.minHeight}px;
`;
