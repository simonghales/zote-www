// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import { smallTextCss } from '../../../styles/shared/typography';

export const headerClass = css`
  padding: ${spacing.small}px;
`;

export const resultsClass = css`
  padding: ${spacing.small}px;
  padding-top: 0;
`;

export const itemClass = css`
  ${smallTextCss};
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: ${spacing.small}px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: ${colors.vibrant};
  }

  &:not(:first-of-type) {
    margin-top: ${spacing.small}px;
  }
`;

export const itemIconClass = css`
  margin-right: ${spacing.small}px;
`;
