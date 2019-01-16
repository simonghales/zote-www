// @flow

import { css } from 'emotion';
import colors from 'styles/config/colors';
import fontWeights from 'styles/config/fontWeights';
import spacing from 'styles/config/spacing';
import { getRem } from '../../../../../styles/utils/measurements';

const containerClass = css`
  margin-top: ${getRem(spacing.mediumLess)};
`;

const headerClass = css`
  border-bottom: 1px solid ${colors.lightFaintShade};
  padding-bottom: ${getRem(2)};
`;

const headerTextClass = css`
  font-weight: ${fontWeights.bold};
  font-size: 11px;
  color: ${colors.shadeBlue};
  text-transform: uppercase;
`;

const rowClass = css`
  margin-top: ${getRem(5)};
`;

const rowGridClass = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${getRem(5)};
`;

const columnClass = css``;

export default {
  containerClass,
  headerClass,
  headerTextClass,
  rowClass,
  rowGridClass,
  columnClass,
};
