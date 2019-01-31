// @flow

import { css } from 'emotion';
import zindexes from '../../../styles/config/zindexes';

const containerClass = css`
  position: absolute;
  top: 100%;
  left: 5px;
  right: 5px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  margin-top: -1px;
  box-shadow: 0 1px 1px rgba(62, 93, 116, 0.18), 0 1px 5px rgba(62, 93, 116, 0.1);
  padding: 5px 0;
  z-index: ${zindexes.dropdown};
`;

const fixedContainerClass = css`
  right: auto;
  width: 200px;
`;

export default {
  containerClass,
  fixedContainerClass,
};
