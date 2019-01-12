// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';

const headerClass = css`
  border-bottom: 1px solid ${transparentize(0.75, colors.shadeBlue)};
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const optionClass = css`
  margin-right: 26px;

  &:last-child {
    margin-right: 0;
  }
`;

const deviceSelectorClass = css`
  font-weight: ${fontWeights.bold};
  font-size: 12px;
  color: ${colors.darkBlue};
  display: flex;
  cursor: pointer;
  align-items: center;

  svg {
    display: block;
    margin-left: 3px;
    color: ${colors.darkLightBlue};
  }
`;

export default {
  headerClass,
  optionClass,
  deviceSelectorClass,
};
