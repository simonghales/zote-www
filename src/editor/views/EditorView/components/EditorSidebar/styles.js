// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import zindexes from '../../../../../styles/config/zindexes';
import { getRem } from '../../../../../styles/utils/measurements';
import {
  commonSidePadding,
  selectHeaderCss,
  selectHeaderIconCss,
  selectHeaderTextCss,
} from '../../../../../styles/shared/misc';

const containerClass = css`
  background-color: ${colors.sidebarBackground};
  height: 100%;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
  z-index: ${zindexes.sidebar};
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  padding: ${commonSidePadding} ${commonSidePadding} 0 ${commonSidePadding};
`;

const logoClass = css`
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

export default {
  containerClass,
  headerClass,
  logoClass,
  middleClass,
  footerClass,
  navSelectorClass,
  navSelectorTextClass,
  navSelectorIconClass,
};
