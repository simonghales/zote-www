// @flow

import { css } from 'emotion';
import { plainInputContainerCss } from '../../../../../styles/shared/input';
import { plainInputStyles } from '../../../../../styles/input';
import { smallBoldTextCss, smallTextCss } from '../../../../../styles/shared/typography';

const containerClass = css`
  ${plainInputContainerCss};
  display: flex;
  align-items: center;
  height: ${plainInputStyles.minHeight}px;
`;

const iconClass = css`
  height: 100%;
  width: ${plainInputStyles.minHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${plainInputStyles.inactiveColor};

  &:hover {
    color: ${plainInputStyles.selectedColor};
  }

  svg {
    display: block;
  }
`;

const valueContainerClass = css`
  ${smallTextCss};
  flex: 1;
`;

const blockNameClass = css`
  font-size: 0.8em;
  color: ${plainInputStyles.inactiveColor};
`;

const propNameClass = css``;

export default {
  containerClass,
  valueContainerClass,
  iconClass,
  blockNameClass,
  propNameClass,
};
