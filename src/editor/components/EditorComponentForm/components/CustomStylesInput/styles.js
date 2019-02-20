// @flow

import { css } from 'emotion';
import { outlineContainerCss } from '../../../../../styles/shared/input';

const containerClass = css`
  ${outlineContainerCss};
`;

const styleWrapperClass = css`
  &:not(:first-of-type) {
    margin-top: 2px;
  }
`;

const addButtonWrapperClass = css`
  &:not(:first-of-type) {
    margin-top: 3px;
  }
`;

export default {
  containerClass,
  styleWrapperClass,
  addButtonWrapperClass,
};
