// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import { getRem } from '../../../../../styles/utils/measurements';
import { inactiveLabelClass, labelCss } from '../../../../../styles/shared/typography';

const headerWrapperClass = css`
  position: relative;
`;

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

const dropdownWrapperClass = css`
  position: relative;
`;

const dropdownClass = css`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.shadeBlue};

  &:hover {
    color: ${colors.darkBlue};
  }
`;

export default {
  headerWrapperClass,
  headerClass,
  labelClass,
  labelInactiveClass,
  dropdownClass,
  dropdownWrapperClass,
};
