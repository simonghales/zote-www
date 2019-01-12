// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';
import { getRem } from '../../../../../styles/utils/measurements';

const classNames = {
  blockItemSelected: 'blockItemSelected',
};

const containerClass = css`
  cursor: pointer;
  position: relative;
  background-color: ${colors.lightBlue};

  &::after {
    content: '';
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${getRem(3)};
    background-color: ${colors.vibrant};
  }
`;

const highlightColor = colors.lightBlueDarkened;

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

  &:hover {
    color: ${colors.vibrant};
    background-color: ${highlightColor};
  }

  .${classNames.blockItemSelected} & {
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
    width: ${getRem(8)};
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

export default {
  classNames,
  containerClass,
  selectedClass,
  clickableClass,
  iconClass,
  nameClass,
};
