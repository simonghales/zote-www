// @flow

import { css } from 'emotion';
import { editorContainerCss } from '../ModuleView/styles';
import { pagesContainerCss, pagesPreviewCss } from '../PagesView/styles';

export const containerClass = css`
  ${pagesContainerCss};
`;

export const editorClass = css`
  ${editorContainerCss};
`;

export const previewClass = css`
  ${pagesPreviewCss};
`;
