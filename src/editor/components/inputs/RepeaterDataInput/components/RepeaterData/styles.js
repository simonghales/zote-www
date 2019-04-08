// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import * as modelStyles from '../RepeaterModel/styles';

export const containerClass = css`
  ${modelStyles.containerClass};
  margin-top: ${spacing.mediumLess}px;
`;

export const labelClass = css`
  ${modelStyles.labelClass};
`;

export const itemsClass = css`
  max-height: 300px;
  overflow-y: auto;
`;

export const addItemClass = css`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;
