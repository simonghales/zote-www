// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';
import { getRem } from '../../../../../styles/utils/measurements';

const headerClass = css`
  margin-bottom: ${getRem(1)};
`;

const labelClass = css`
  font-weight: ${fontWeights.medium};
  font-size: 11px;
  color: ${colors.darkBlue};
  padding-left: ${getRem(5)};
  display: block;
`;

const labelInactiveClass = css`
  color: ${colors.shadeBlue};
`;

export default {
  headerClass,
  labelClass,
  labelInactiveClass,
};
