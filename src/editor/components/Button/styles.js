// @flow

import { css } from 'emotion';
import { darken } from 'polished';
import { buttonResetCss, solidButtonCss } from '../../../styles/button';
import fontWeights from '../../../styles/config/fontWeights';
import colors from '../../../styles/config/colors';

const classNames = {
  buttonIcon: 'buttonIcon',
};

const buttonClass = css`
  ${buttonResetCss};
`;

const solidButtonClass = css`
  ${solidButtonCss};
`;

const slimIconButtonClass = css`
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: ${fontWeights.bold};
  background-color: ${colors.lightBlue};
  color: ${colors.darkLightBlue};
  padding: 3px 9px;
  border-radius: 18px;

  svg {
    //width: 8px;
    display: block;
    margin-right: 4px;
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

export default {
  classNames,
  buttonClass,
  solidButtonClass,
  slimIconButtonClass,
  slimIconDarkerButtonClass,
};
