// @flow

import { css } from 'emotion';
import colors from '../../../../../styles/config/colors';
import zindexes from '../../../../../styles/config/zindexes';
import spacing from '../../../../../styles/config/spacing';
import fontWeights from '../../../../../styles/config/fontWeights';
import { getRem } from '../../../../../styles/utils/measurements';

const containerClass = css`
  background-color: ${colors.sidebarBackground};
  height: 100%;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
  z-index: ${zindexes.sidebar};
  display: flex;
  flex-direction: column;
`;

const headerClass = css`
  padding: ${getRem(spacing.medium)} ${getRem(spacing.medium)} 0 ${getRem(spacing.medium)};
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
  padding: 0 ${getRem(spacing.medium)} ${getRem(spacing.medium)} ${getRem(spacing.medium)};
`;

const navSelectorClass = css`
  margin-top: ${getRem(8)};
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
  margin-left: ${getRem(4)};

  svg {
    display: block;
    width: ${getRem(7)};
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
