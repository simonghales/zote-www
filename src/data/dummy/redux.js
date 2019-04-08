// @flow

import type { EditorReduxState } from '../../redux/editor/reducer';
import { DUMMY_BLOCK_STYLES, DUMMY_SECOND_COMPONENT, DUMMY_TEST_COMPONENT } from './components';
import type { UIReduxState } from '../../redux/ui/reducer';
import type { StylesReduxState } from '../../redux/styles/reducer';

export const dummyEditorReduxState: EditorReduxState = {
  components: {
    [DUMMY_TEST_COMPONENT.key]: DUMMY_TEST_COMPONENT,
    [DUMMY_SECOND_COMPONENT.key]: DUMMY_SECOND_COMPONENT,
  },
};

export const dummyUiReduxState = {
  componentsSelectedBlockKeys: {
    DUMMY_TEST_COMPONENT: 'DUMMY_COMPONENT_IMPORT_BLOCK',
  },
};

export const dummyStylesReduxState: StylesReduxState = {
  [DUMMY_BLOCK_STYLES.key]: DUMMY_BLOCK_STYLES,
};
