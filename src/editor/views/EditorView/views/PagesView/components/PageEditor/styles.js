// @flow

import { css } from 'emotion';
import { mediumPadding } from '../../../../../../components/EditorHeader/styles';

export const containerClass = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const bodyClass = css`
  padding: ${mediumPadding};
  flex: 1;
`;

export const editBlocksWrapperClass = css`
  margin-bottom: 20px;
`;

export const footerClass = css`
  padding: 0 ${mediumPadding} ${mediumPadding} ${mediumPadding};
`;
