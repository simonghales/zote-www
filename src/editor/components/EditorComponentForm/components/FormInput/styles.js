// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import { getRem } from '../../../../../styles/utils/measurements';
import { inactiveLabelClass, labelCss } from '../../../../../styles/shared/typography';

const headerClass = css`
  display: flex;
  align-items: center;
  margin-bottom: ${getRem(1)};
`;

const labelClass = css`
  ${labelCss};
`;

const labelInactiveClass = css`
  ${inactiveLabelClass};
`;

export default {
  headerClass,
  labelClass,
  labelInactiveClass,
};
