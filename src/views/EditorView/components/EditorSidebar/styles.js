// @flow

import { css } from 'emotion';
import colors from '../../../../styles/config/colors';
import zindexes from '../../../../styles/config/zindexes';
import spacing from '../../../../styles/config/spacing';
import fontWeights from '../../../../styles/config/fontWeights';

const containerClass = css`
  background-color: ${colors.sidebarBackground};
  height: 100%;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
  z-index: ${zindexes.sidebar};
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  padding: ${spacing.medium}px ${spacing.medium}px 0 ${spacing.medium}px;
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
  padding: 0 ${spacing.medium}px ${spacing.medium}px ${spacing.medium}px;
`;

const navSelectorClass = css`
  margin-top: 8px;
  font-weight: ${fontWeights.bold};
  font-size: 14px;
  color: ${colors.darkBlue};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const navSelectorTextClass = css``;

const navSelectorIconClass = css`
  color: ${colors.darkLightBlue};
  margin-left: 4px;

  svg {
    display: block;
    width: 7px;
  }
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
