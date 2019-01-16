// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import { commonSidePadding } from '../../../../../styles/shared/misc';
import { getRem } from '../../../../../styles/utils/measurements';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';

const wrapperClass = css`
  padding: 0 ${commonSidePadding};
`;

const containerClass = css`
  display: flex;
  position: relative;
`;

const navOptionClass = css`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${colors.darkLightBlue};
  cursor: pointer;
  padding-bottom: ${getRem(2)};
  position: relative;
  opacity: 0.5;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: ${colors.lightFaintShade};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: ${transparentize(0.75, colors.darkLightBlue)};
    visibility: hidden;
    transform: translateX(-100%);
    transition: transform 250ms ease;
  }

  &:hover {
    opacity: 1;

    &::after {
      transform: translateX(0);
      visibility: visible;
    }
  }
`;

const navOptionSelectedClass = css`
  color: ${colors.vibrant};
  opacity: 1;

  &::after {
    background-color: ${colors.vibrant};
    visibility: visible;
    transform: translateX(0);
    transition: none;
  }
`;

const navOptionIconClass = css`
  margin-right: ${getRem(4)};
  svg {
    display: block;
  }
`;

const navOptionTextClass = css`
  font-weight: ${fontWeights.bold};
  font-size: 13px;
  letter-spacing: 0;
  text-align: left;
`;

export default {
  wrapperClass,
  containerClass,
  navOptionClass,
  navOptionSelectedClass,
  navOptionIconClass,
  navOptionTextClass,
};
