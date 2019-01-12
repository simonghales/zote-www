// @flow

import { css } from 'emotion';

const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

const editorContainerClass = css`
  width: 100%;
  max-width: 320px;
  height: 100%;
`;

const previewContainerClass = css`
  flex: 1;
  height: 100%;
`;

export default {
  containerClass,
  editorContainerClass,
  previewContainerClass,
};
