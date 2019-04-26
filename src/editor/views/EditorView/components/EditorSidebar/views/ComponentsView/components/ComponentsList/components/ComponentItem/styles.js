// @flow

import { css } from 'emotion';
import {
  listItemActiveContainerCss,
  listItemContainerCss,
  listItemEditCss,
  listItemIconCss,
  listItemInfoCss,
  listItemTitleCss,
} from '../../../../../PagesView/components/PagesList/components/PageItem/styles';

export const containerClass = css`
  ${listItemContainerCss};
  min-height: 39px;
`;

export const activeContainerClass = css`
  ${listItemActiveContainerCss};
`;

export const iconClass = css`
  ${listItemIconCss};
`;

export const infoClass = css`
  ${listItemInfoCss};
`;

export const titleClass = css`
  ${listItemTitleCss};
`;

export const editClass = css`
  ${listItemEditCss};
`;
