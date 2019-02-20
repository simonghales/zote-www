// @flow
import { css } from 'emotion';
import { smallTextCss } from '../../../../../../../styles/shared/typography';
import fontWeights from '../../../../../../../styles/config/fontWeights';

const containerClass = css`
  ${smallTextCss};
`;

const labelClass = css`
  display: inline-block;
  margin-right: 5px;
  font-weight: ${fontWeights.medium};
`;

const valueClass = css``;

export default {
  containerClass,
  labelClass,
  valueClass,
};
