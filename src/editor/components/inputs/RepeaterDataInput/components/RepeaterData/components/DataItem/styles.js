// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import { labelCss } from '../../../../../../../../styles/shared/typography';

export const containerClass = css`
  // &:not(:first-child) {
  //   margin-top: 10px;
  //   border-top: 1px solid ${colors.lightFaintShade};
  //   padding-top: 5px;
  // }
  
  margin-bottom: 5px;
`;

export const inputContainerClass = css`
  &:not(:first-child) {
    margin-top: 5px;
  }
`;

export const inputLabelClass = css`
  ${labelCss};
`;

export const optionsClass = css`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 5px;
`;

export const directionOptionsClass = css`
  display: flex;

  button {
    margin-right: 3px;
  }
`;

export const headerClass = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const footerClass = css`
  display: flex;
  justify-content: center;
`;
