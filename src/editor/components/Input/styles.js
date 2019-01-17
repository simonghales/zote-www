// @flow

import { css } from 'emotion';
import { inputResetCss, plainInputCss, shortInputCss } from '../../../styles/input';

const inputClass = css`
  ${inputResetCss};
`;

const inputShortClass = css`
  ${shortInputCss};
`;

const inputPlainClass = css`
  ${plainInputCss};
`;

export default {
  inputClass,
  inputShortClass,
  inputPlainClass,
};
