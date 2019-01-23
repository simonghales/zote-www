// @flow

import type { EditorReduxState } from '../../redux/editor/reducer';
import { DUMMY_BLOCK_STYLES, DUMMY_TEST_COMPONENT } from './components';
import type { UIReduxState } from '../../redux/ui/reducer';
import type { StylesReduxState } from '../../redux/styles/reducer';

export const dummyEditorReduxState: EditorReduxState = {
  components: {
    [DUMMY_TEST_COMPONENT.key]: DUMMY_TEST_COMPONENT,
  },
};

export const dummyUiReduxState = {
  selectedComponentKey: DUMMY_TEST_COMPONENT.key,
  componentsSelectedBlockKeys: {
    DUMMY_TEST_COMPONENT: 'DUMMY_TEXT_BLOCK',
  },
};

export const dummyStylesReduxState: StylesReduxState = {
  [DUMMY_BLOCK_STYLES.key]: DUMMY_BLOCK_STYLES,
};
