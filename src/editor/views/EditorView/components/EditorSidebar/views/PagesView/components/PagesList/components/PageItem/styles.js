// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { smallBoldTextCss } from '../../../../../../../../../../../styles/shared/typography';
import { interactiveSliverCss } from '../../../../../../../../../../components/ComponentSortable/components/BlockItem/styles';

export const containerClass = css`
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

export const activeContainerClass = css`
  background-color: ${colors.lightBlueDarkened};
  color: ${colors.vibrant};
  &::after {
    background-color: ${colors.vibrant};
    visibility: visible;
    transform: translateY(0);
    transition: none;
  }
`;

export const iconClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkLightBlue};
  width: 20px;
`;

export const infoClass = css`
  flex: 1;
  margin: 0 5px;
`;

export const titleClass = css`
  ${smallBoldTextCss};
  line-height: 1.2;
  color: inherit;
`;

export const pathClass = css`
  ${smallBoldTextCss};
  line-height: 1.2;
  color: inherit;
`;

export const editClass = css`
  margin-right: 2px;

  button svg {
    position: relative;
    left: 1px;
  }
`;
