// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import fontWeights from 'styles/config/fontWeights';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../../../styles/utils/measurements';

const containerClass = css`
  margin-bottom: ${getRem(spacing.mediumLess)};
`;

const headerClass = css`
  border-bottom: 1px solid ${colors.lightFaintShade};
  padding-bottom: ${getRem(2)};
  margin-bottom: ${getRem(5)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const headerTextClass = css`
  font-weight: ${fontWeights.bold};
  font-size: 11px;
  color: ${colors.shadeBlue};
  text-transform: uppercase;
`;

const headerIconClass = css`
  color: ${colors.shadeBlue};
  width: ${getRem(10)};
  height: ${getRem(10)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${getRem(2)};

  svg {
    display: block;
  }
`;

const hiddenBodyClass = css`
  display: none;
`;

const rowClass = css`
  &:not(:first-of-type) {
    margin-top: ${getRem(5)};
  }
`;

const rowGridClass = css`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-column-gap: ${getRem(5)};
`;

const columnClass = css`
  margin-bottom: ${getRem(5)};
`;

const sharedRowColumnClass = css``;

export default {
  containerClass,
  headerClass,
  headerTextClass,
  headerIconClass,
  rowClass,
  rowGridClass,
  columnClass,
  sharedRowColumnClass,
  hiddenBodyClass,
};
