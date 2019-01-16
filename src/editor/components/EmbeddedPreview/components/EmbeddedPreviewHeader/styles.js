// @flow

import { css } from 'emotion';
import { transparentize } from 'polished';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';
import { getRem } from '../../../../../styles/utils/measurements';
import { smallBoldTextCss } from '../../../../../styles/shared/typography';
import { commonHeaderHeight, commonSidePadding } from '../../../../../styles/shared/misc';

const headerClass = css`
  border-bottom: ${getRem(1)} solid ${transparentize(0.75, colors.shadeBlue)};
  height: ${commonHeaderHeight};
  display: flex;
  align-items: center;
  padding: 0 ${commonSidePadding};
`;

const optionClass = css`
  margin-right: ${getRem(26)};

  &:last-child {
    margin-right: 0;
  }
`;

const selectorCss = css`
  ${smallBoldTextCss};
  display: flex;
  cursor: pointer;
  align-items: center;

  svg {
    display: block;
    margin-left: ${getRem(3)};
    color: ${colors.darkLightBlue};
  }
`;

const deviceSelectorClass = css`
  ${selectorCss};
`;

const zoomSelectorClass = css`
  ${selectorCss};
`;

export default {
  headerClass,
  optionClass,
  deviceSelectorClass,
  zoomSelectorClass,
};
