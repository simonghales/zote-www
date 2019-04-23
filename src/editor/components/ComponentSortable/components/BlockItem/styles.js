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

export const sliverCss = css`
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

export const interactiveSliverCss = css`
  position: relative;
  overflow: hidden;

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

const clickableClass = css`
  ${interactiveSliverCss};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${getRem(7)};

  &:hover {
    color: ${colors.vibrant};
    background-color: ${highlightColor};
  }

  &.${classNames.blockItemSelected} {
    color: ${colors.vibrant};
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
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

const openComponentClass = css`
  width: 14px;
  height: 14px;
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
  openComponentClass,
};
