// @flow

import { css } from 'emotion';
import { darken } from 'polished';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';
import { getRem } from '../../../../../styles/utils/measurements';

const classNames = {
  blockItemWrapperSelected: 'blockItemWrapperSelected',
  blockItemSelected: 'blockItemSelected',
  addingBlock: 'addingBlock',
};

export const blockItemClassNames = classNames;

const isAddingBlockState = `.${classNames.addingBlock} &`;

const sliverCss = css`
  content: '';
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${getRem(3)};
`;

const highlightColor = colors.lightBlueDarkened;

const containerClass = css`
  cursor: pointer;
  position: relative;

  &::after {
    ${sliverCss};
    background-color: ${colors.vibrant};
  }
`;

const selectedClass = css`
  &::after {
    visibility: visible;
  }

  background-color: ${highlightColor};
`;

const clickableClass = css`
  display: flex;
  align-items: center;
  padding: ${getRem(7)};
  position: relative;
  overflow: hidden;

  &:hover {
    color: ${colors.vibrant};
    background-color: ${highlightColor};
  }

  &.${classNames.blockItemSelected} {
    color: ${colors.vibrant};
  }

  &::before {
    ${sliverCss};
    background-color: ${darken(0.03, highlightColor)};
  }

  &::after {
    ${sliverCss};
    background-color: ${darken(0.07, highlightColor)};
    transform: translateY(-100%);
    transition: transform 250ms ease-in;
  }

  &:hover {
    &::before,
    &::after {
      visibility: visible;
    }

    &::after {
      transform: translateY(0);
    }
  }
`;

const iconClass = css`
  color: ${colors.darkLightBlue};
  width: ${getRem(15)};
  height: ${getRem(15)};
  background-color: ${colors.white};
  border-radius: ${getRem(3)};
  margin-right: ${getRem(5)};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
  }

  .${classNames.blockItemSelected} & {
    background-color: ${colors.vibrant};
    color: ${colors.white};
  }
`;

const nameClass = css`
  font-weight: ${fontWeights.medium};
  font-size: 11px;
  position: relative;
  top: 1px;
`;

const addBlockBeforeClass = css`
  left: 6px;
  top: -9px;
`;

const addBlockIconClass = css`
  position: absolute;
  z-index: 500;
  visibility: hidden;

  ${isAddingBlockState} {
    visibility: visible;
  }
`;

const addBlockInsideClass = css`
  right: 5px;
`;

export default {
  classNames,
  containerClass,
  selectedClass,
  clickableClass,
  iconClass,
  nameClass,
  addBlockBeforeClass,
  addBlockIconClass,
  addBlockInsideClass,
};
