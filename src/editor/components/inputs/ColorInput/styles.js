// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../../../../styles/input';
import zindexes from '../../../../styles/config/zindexes';

const wrapperClass = css`
  position: relative;
`;

const focusedContainerClass = css`
  background-color: ${plainInputStyles.focusBorderColor};
`;

const containerClass = css`
  height: ${plainInputStyles.minHeight}px;
  padding: 2px;
  background-color: ${plainInputStyles.backgroundColor};
  border-radius: ${plainInputStyles.borderRadius}px;

  &:focus {
    ${focusedContainerClass};
  }
`;

const colorFillClass = css`
  width: 100%;
  height: 100%;
  border-radius: ${plainInputStyles.borderRadius}px;
`;

const menuClass = css`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  min-width: 220px;
  z-index: ${zindexes.colorMenu};
  margin-top: 4px;
`;

export default {
  wrapperClass,
  containerClass,
  focusedContainerClass,
  colorFillClass,
  menuClass,
};
