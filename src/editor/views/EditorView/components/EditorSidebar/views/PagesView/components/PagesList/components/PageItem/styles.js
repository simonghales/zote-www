// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { smallBoldTextCss } from '../../../../../../../../../../../styles/shared/typography';
import { interactiveSliverCss } from '../../../../../../../../../../components/ComponentSortable/components/BlockItem/styles';

export const listItemContainerCss = css`
  ${interactiveSliverCss};
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: ${colors.lightBlue};
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueDarkened};
    color: ${colors.vibrant};
  }
`;

export const listItemActiveContainerCss = css`
  background-color: ${colors.lightBlueDarkened};
  color: ${colors.vibrant};
  &::after {
    background-color: ${colors.vibrant};
    visibility: visible;
    transform: translateY(0);
    transition: none;
  }
`;

export const listItemIconCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkLightBlue};
  width: 20px;
`;

export const listItemInfoCss = css`
  flex: 1;
  margin: 0 5px;
`;

export const listItemTitleCss = css`
  ${smallBoldTextCss};
  line-height: 1.2;
  color: inherit;
`;

export const listItemEditCss = css`
  margin-right: 2px;

  button svg {
    position: relative;
    left: 1px;
  }
`;

export const containerClass = css`
  ${listItemContainerCss};
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

export const pathClass = css`
  ${smallBoldTextCss};
  line-height: 1.2;
  color: inherit;
`;

export const editClass = css`
  ${listItemEditCss};
`;
