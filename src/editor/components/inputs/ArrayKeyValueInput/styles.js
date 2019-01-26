// @flow

import { css } from 'emotion';
import { plainInputStyles } from '../../../../styles/input';
import { getRem } from '../../../../styles/utils/measurements';
import { ENTRY_LABEL_WIDTH } from './components/Entry/styles';

const containerClass = css`
  border: 1px solid ${plainInputStyles.backgroundColor};
  padding: ${getRem(5)};
  border-radius: ${plainInputStyles.borderRadius}px;
`;

const formClass = css`
  display: flex;
`;

const formKeyClass = css`
  width: ${ENTRY_LABEL_WIDTH}px;
`;

const formValueClass = css`
  flex: 1;
  margin: 0 ${getRem(5)};
`;

const formButtonClass = css`
  display: flex;
  align-items: center;
`;

const entriesContainerClass = css`
  border-top: 1px solid ${plainInputStyles.backgroundColor};
  margin-top: ${getRem(5)};
`;

export default {
  containerClass,
  formClass,
  formKeyClass,
  formValueClass,
  formButtonClass,
  entriesContainerClass,
};
