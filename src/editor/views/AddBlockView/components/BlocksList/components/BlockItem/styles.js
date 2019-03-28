// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import spacing from 'styles/config/spacing';
import { smallTextCss } from '../../../../../../../styles/shared/typography';
import fontWeights from '../../../../../../../styles/config/fontWeights';

export const classNames = {
  blockItemContainer: 'blockItemContainer',
};

export const containerClass = css`
  ${smallTextCss};
  display: flex;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
  padding: ${spacing.small}px;
  font-weight: ${fontWeights.medium};

  &:hover {
    color: ${colors.vibrant};
  }
`;

export const iconClass = css`
  color: ${colors.darkLightBlue};
  background-color: #ffffff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  position: relative;

  svg {
    width: 11px;
    height: auto;
  }

  .${classNames.blockItemContainer}:hover & {
    background-color: ${colors.vibrant};
    color: #ffffff;

    > svg {
      visibility: hidden;
    }
  }
`;

export const iconHoverClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  .${classNames.blockItemContainer}:hover & {
    visibility: visible;
  }
`;
