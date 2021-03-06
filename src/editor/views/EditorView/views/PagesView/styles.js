// @flow

import { css } from 'emotion';
import { editorContainerCss } from '../ModuleView/styles';

export const pagesContainerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const containerClass = css`
  ${pagesContainerCss};
`;

export const editorClass = css`
  ${editorContainerCss};
`;

export const pagesPreviewCss = css`
  box-shadow: -1px 0 4px rgba(0, 0, 0, 0.05);
  position: relative;
  flex: 1;
  height: 100%;
`;

export const previewClass = css`
  ${pagesPreviewCss};
`;
