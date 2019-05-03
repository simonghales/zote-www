// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { getRem } from '../../../../styles/utils/measurements';
import { plainInputStyles } from '../../../../styles/input';

const containerClass = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${getRem(5)};
`;

const optionClass = css`
  background-color: ${plainInputStyles.backgroundColor};
  border: 2px solid ${plainInputStyles.backgroundColor};
  border-radius: ${plainInputStyles.borderRadius}px;
  height: ${plainInputStyles.minHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${plainInputStyles.inactiveColor};

  &:hover {
    background-color: ${plainInputStyles.backgroundHoverColor};
    border-color: ${plainInputStyles.backgroundHoverColor};
  }

  svg {
    display: block;
    //width: 10px;
  }
`;

const selectedOptionClass = css`
  background-color: ${colors.white};
  border-color: ${colors.white};
  color: ${plainInputStyles.selectedColor};

  &:hover {
    background-color: ${colors.white};
    border-color: ${colors.white};
  }
`;

export default {
  containerClass,
  optionClass,
  selectedOptionClass,
};
