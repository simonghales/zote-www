// @flow

import { css } from 'emotion';
import { darken } from 'polished';
import {
  buttonResetCss,
  roundIconActiveButtonCss,
  roundIconButtonCss,
  slimSolidButtonCss,
  solidButtonCss,
} from '../../../styles/button';
import fontWeights from '../../../styles/config/fontWeights';
import colors from '../../../styles/config/colors';
import { getEm } from '../../../styles/utils/measurements';

const classNames = {
  buttonIcon: 'buttonIcon',
};

const buttonClass = css`
  ${buttonResetCss};
`;

const solidButtonClass = css`
  ${solidButtonCss};
`;

const slimSolidButtonClass = css`
  ${slimSolidButtonCss};
`;

const slimIconButtonFontSize = 11;

const slimIconButtonClass = css`
  display: flex;
  align-items: center;
  font-size: ${slimIconButtonFontSize}px;
  font-weight: ${fontWeights.bold};
  background-color: ${colors.lightBlue};
  color: ${colors.darkLightBlue};
  padding: ${getEm(3, slimIconButtonFontSize)} ${getEm(9, slimIconButtonFontSize)};
  border-radius: ${getEm(18, slimIconButtonFontSize)};

  svg {
    //width: 8px;
    display: block;
    margin-right: ${getEm(4, slimIconButtonFontSize)};
  }

  &:hover {
    background-color: ${colors.lightBlueDarkened};
  }
`;

const darkerBackground = '#d7dde7';

const slimIconDarkerButtonClass = css`
  ${slimIconButtonClass};
  background-color: ${darkerBackground};

  &:hover {
    background-color: ${darken(0.025, darkerBackground)};
  }
`;

const roundIconButtonClass = css`
  ${roundIconButtonCss};
`;

const roundIconActiveButtonClass = css`
  ${roundIconActiveButtonCss};
`;

export default {
  classNames,
  buttonClass,
  solidButtonClass,
  slimSolidButtonClass,
  slimIconButtonClass,
  slimIconDarkerButtonClass,
  roundIconButtonClass,
  roundIconActiveButtonClass,
};
