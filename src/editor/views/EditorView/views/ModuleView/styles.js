// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../styles/utils/measurements';

const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const editorContainerCss = css`
  width: 100%;
  max-width: ${getRem(360)};
  height: 100%;
`;

const editorContainerClass = css`
  ${editorContainerCss};
`;

const previewContainerClass = css`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export default {
  containerClass,
  editorContainerClass,
  previewContainerClass,
};
