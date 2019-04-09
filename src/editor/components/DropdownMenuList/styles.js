// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { selectableOptionCss } from '../../../styles/shared/option';

const optionClass = css`
  ${selectableOptionCss};
  display: flex;
  align-items: center;
`;

const iconClass = css`
  display: flex;
  align-items: center;
  min-width: 16px;
  margin-right: 2px;
  color: ${colors.darkLightBlue};
`;

export default {
  optionClass,
  iconClass,
};
