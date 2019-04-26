// @flow

import { css } from 'emotion';
import { mediumPadding } from '../../../../../../components/EditorHeader/styles';

export const pageEditorContainerCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const containerClass = css`
  ${pageEditorContainerCss};
`;

export const pageEditorBodyCss = css`
  padding: ${mediumPadding};
  flex: 1;
`;

export const bodyClass = css`
  ${pageEditorBodyCss};
`;

export const editBlocksWrapperClass = css`
  display: flex;
  margin-bottom: 20px;

  > * {
    margin-right: 5px;
  }
`;

export const footerClass = css`
  padding: 0 ${mediumPadding} ${mediumPadding} ${mediumPadding};
`;
