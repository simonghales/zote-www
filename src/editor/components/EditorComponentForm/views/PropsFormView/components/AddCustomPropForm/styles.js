// @flow

import { css } from 'emotion';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../../../../../styles/utils/measurements';
import { inactiveLabelClass, labelCss } from '../../../../../../../styles/shared/typography';

const containerClass = css`
  margin-top: ${getRem(spacing.small)};
`;

const addClass = css`
  margin-bottom: ${getRem(spacing.small)};
`;

const formClass = css`
  display: flex;
  margin-bottom: ${getRem(spacing.smallLess)};
`;

const formInputWrapperClass = css`
  flex: 1;
  margin-right: ${getRem(spacing.smallLess)};
`;

const formLabelClass = css`
  ${labelCss};
  padding-bottom: ${getRem(1)};
`;

const formLabelInactiveClass = css`
  ${inactiveLabelClass};
`;

const formSaveWrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 32px;
`;

export default {
  addClass,
  containerClass,
  formClass,
  formInputWrapperClass,
  formLabelClass,
  formLabelInactiveClass,
  formSaveWrapperClass,
};
