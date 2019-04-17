// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import zindexes from '../../../../../styles/config/zindexes';
import { getRem } from '../../../../../styles/utils/measurements';
import {
  commonHeaderHeight,
  commonSidePadding,
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../../../styles/shared/misc';
import fontWeights from '../../../../../styles/config/fontWeights';

const containerClass = css`
  background-color: ${colors.sidebarBackground};
  height: 100%;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
  z-index: ${zindexes.sidebar};
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  padding: 0 10px 0 ${commonSidePadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoClass = css`
  height: ${commonHeaderHeight};
  display: flex;
  align-items: center;
  //color: ${colors.vibrant};
  font-weight: ${fontWeights.medium};

  svg {
    display: block;
  }
`;

const middleClass = css`
  flex: 1;
`;

const footerClass = css`
  padding: 0 ${commonSidePadding} ${commonSidePadding} ${commonSidePadding};
`;

const navSelectorClass = css`
  ${selectHeaderCss};
  margin-top: ${getRem(8)};
`;

const navSelectorTextClass = css`
  ${selectHeaderTextCss};
`;

const navSelectorIconClass = css`
  ${selectHeaderIconCss};
`;

const quickSearchClass = css`
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  color: ${colors.shadeBlue};
  opacity: 0.5;
  position: relative;
  top: 1px;

  &:hover {
    opacity: 1;
  }
`;

const quickSearchIconClass = css`
  position: relative;
  top: 1px;
  margin-left: 5px;
`;

export default {
  containerClass,
  headerClass,
  logoClass,
  middleClass,
  footerClass,
  navSelectorClass,
  navSelectorTextClass,
  navSelectorIconClass,
  quickSearchClass,
  quickSearchIconClass,
};
