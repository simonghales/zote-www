// @flow

import { css } from 'emotion';
import { editorContainerCss } from '../ModuleView/styles';

export const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const editorClass = css`
  ${editorContainerCss};
`;

export const previewClass = css`
  box-shadow: -1px 0 4px rgba(0, 0, 0, 0.05);
  position: relative;
  flex: 1;
  height: 100%;
`;
