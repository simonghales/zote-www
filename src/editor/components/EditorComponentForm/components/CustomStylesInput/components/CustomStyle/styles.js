// @flow
import { css } from 'emotion';
import { smallTextCss } from '../../../../../../../styles/shared/typography';
import colors from '../../../../../../../styles/config/colors';
import fontWeights from '../../../../../../../styles/config/fontWeights';

const containerClass = css`
  ${smallTextCss};
`;

const inputCss = css`
  ${smallTextCss};
  background: none;
  border: 0;
  padding: 0;

  &:focus {
    background-color: ${colors.richBlue};
    color: ${colors.white};
  }
`;

const labelClass = css`
  display: inline-block;
  margin-right: 5px;

  input {
    ${inputCss};
    font-weight: ${fontWeights.medium};
  }
`;

const valueClass = css`
  display: inline-block;
  input {
    ${inputCss};
  }
`;

export default {
  containerClass,
  labelClass,
  valueClass,
};
