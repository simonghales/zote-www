// @flow

import { css } from 'emotion';
import {
  inputResetCss,
  plainInputCss,
  shortInputCss,
  slimPlainInputCss,
} from '../../../styles/input';

const inputClass = css`
  ${inputResetCss};
`;

const inputShortClass = css`
  ${shortInputCss};
`;

const inputPlainClass = css`
  ${plainInputCss};
`;

const inputSlimPlainClass = css`
  ${slimPlainInputCss};
`;

export default {
  inputClass,
  inputShortClass,
  inputPlainClass,
  inputSlimPlainClass,
};
