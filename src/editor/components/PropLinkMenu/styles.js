// @flow

import { css } from 'emotion';
import colors from '../../../styles/config/colors';
import { getRem } from '../../../styles/utils/measurements';
import { selectableOptionCss } from '../../../styles/shared/option';
import fontWeights from '../../../styles/config/fontWeights';

const menuClass = css`
  max-height: 250px;
  overflow-y: auto;
`;

const blockOptionClass = css`
  margin: ${getRem(5)} 0;

  &:not(:first-of-type) {
    margin-top: ${getRem(10)};
  }
`;

const blockOptionHeaderClass = css`
  padding: 0 ${getRem(10)};
  font-size: 0.9rem;
`;

const optionClass = css`
  ${selectableOptionCss};
`;

const optionSubtitleClass = css`
  color: ${colors.darkLightBlue};
  font-weight: ${fontWeights.normal};
`;

const emptyMessageClass = css`
  padding: 0 ${getRem(10)};
`;

export default {
  menuClass,
  blockOptionClass,
  blockOptionHeaderClass,
  optionClass,
  optionSubtitleClass,
  emptyMessageClass,
};
