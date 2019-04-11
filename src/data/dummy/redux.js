// @flow

import type { EditorReduxState } from '../../redux/editor/reducer';
import { DUMMY_SECOND_COMPONENT, DUMMY_TEST_COMPONENT } from './components';
import type { StylesReduxState } from '../../redux/styles/reducer';
import { DUMMY_BLOCK_STYLES, DUMMY_MIXIN_STYLES, DUMMY_MIXIN } from './styles';

export const dummyEditorReduxState: EditorReduxState = {
  components: {
    [DUMMY_TEST_COMPONENT.key]: DUMMY_TEST_COMPONENT,
    [DUMMY_SECOND_COMPONENT.key]: DUMMY_SECOND_COMPONENT,
  },
};

export const dummyUiReduxState = {
  componentsSelectedBlockKeys: {
    DUMMY_TEST_COMPONENT: 'DUMMY_CONTAINER_BLOCK',
  },
};

export const dummyStylesReduxState: StylesReduxState = {
  styles: {
    [DUMMY_BLOCK_STYLES.key]: DUMMY_BLOCK_STYLES,
    [DUMMY_MIXIN_STYLES.key]: DUMMY_MIXIN_STYLES,
  },
  mixins: {
    [DUMMY_MIXIN.key]: DUMMY_MIXIN,
  },
};
