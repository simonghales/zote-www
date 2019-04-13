// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import fontWeights from '../../../../../styles/config/fontWeights';

export const listClass = css`
  display: flex;
  flex-wrap: wrap;
  margin-top: -5px;
`;

const tagCss = css`
  font-size: 12px;
  background-color: ${colors.inputShade};
  color: ${colors.darkLightBlue};
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 2px;
  cursor: pointer;
  font-weight: ${fontWeights.medium};
  padding: 4px 2px 4px 6px;
`;

export const tagClass = css`
  ${tagCss};
  display: flex;
  align-items: center;
`;

export const tagInactiveClass = css`
  &:hover {
    background-color: ${colors.inputShadeFocused};
  }
`;

export const tagActiveClass = css`
  background-color: #ffffff;
  color: ${colors.vibrant};
`;

export const tagRemoveDisabledClass = css`
  padding-right: 6px;
`;

export const tagLabelClass = css``;

export const tagButtonClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 2px;

  &:hover {
    background-color: ${colors.vibrant};
    color: ${colors.white};
  }
`;

export const addTagClass = css`
  ${tagCss};
  background: none;
  display: flex;
  align-items: center;
  padding-right: 6px;

  &:hover {
    background-color: ${colors.vibrant};
    color: ${colors.white};
  }

  svg {
    margin-left: 5px;
  }
`;
