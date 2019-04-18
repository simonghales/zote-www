// @flow

import { css } from 'emotion';
import { commonHeaderHeight, commonSidePadding } from '../../../../../../../styles/shared/misc';
import fontWeights from '../../../../../../../styles/config/fontWeights';

export const headerClass = css`
  padding: 0 10px 0 ${commonSidePadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const headingClass = css`
  height: ${commonHeaderHeight};
  display: flex;
  align-items: center;
  font-weight: ${fontWeights.medium};
`;
