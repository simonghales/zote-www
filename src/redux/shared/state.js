// @flow
import type { ReduxRootState } from '../store';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import {
  getSelectedComponentKeySelector,
  getSelectedComponentSelector,
} from '../../editor/state/reselect/component';
import { getComponentParentComponents, isBlockInComponent } from '../../data/component/state';
import { getSelectedComponentSelectedBlockKey } from '../../editor/state/reselect/ui';
import {
  getComponentBlockFromReduxEditorState,
  getComponentsFromReduxEditorState,
} from '../editor/state';
import { doesBlockAllowChildBlocks } from '../../data/block/state';
import {
  getReduxUiAddingBlockSelectedKey,
  getReduxUiAddingBlockSelectedPosition,
  getReduxPreviousComponentKey,
} from '../ui/state';
import type { ComponentModel } from '../../data/component/model';
import type { UIReduxState } from '../ui/reducer';
import type { EditorReduxState } from '../editor/reducer';
import type { StylesReduxState } from '../styles/state';

export function getReduxUIState(state: ReduxRootState): UIReduxState {
  return state.ui;
}

export function getReduxEditorState(state: ReduxRootState): EditorReduxState {
  return state.data.present.editor;
}

export function getReduxStylesState(state: ReduxRootState): StylesReduxState {
  return state.data.present.styles;
}

export function getReduxSafeAddingBlockSelectedKeyAndPosition(
  rootState: ReduxRootState
): [string, AddBlockPositions] {
  const component = getSelectedComponentSelector(rootState);
  let blockKey = getReduxUiAddingBlockSelectedKey(rootState);
  let position = getReduxUiAddingBlockSelectedPosition(rootState);
  if (!isBlockInComponent(component, blockKey)) {
    blockKey = getSelectedComponentSelectedBlockKey(rootState);
    const editorState = getReduxEditorState(rootState);
    const block = getComponentBlockFromReduxEditorState(editorState, component.key, blockKey);
    if (!doesBlockAllowChildBlocks(block)) {
      position = ADD_BLOCK_POSITIONS.before;
    } else {
      position = ADD_BLOCK_POSITIONS.inside;
    }
  }
  return [blockKey, position];
}

export function getReduxParentComponent(rootState: ReduxRootState): ComponentModel | null {
  const currentComponentKey = getSelectedComponentKeySelector(rootState);
  const editorState = getReduxEditorState(rootState);
  const components = getComponentsFromReduxEditorState(editorState);
  const parentComponents = getComponentParentComponents(components, currentComponentKey);
  if (parentComponents.length > 0) {
    const previousComponentKey = getReduxPreviousComponentKey(rootState);
    const previousParentComponent = parentComponents.find(
      component => component.key === previousComponentKey
    );
    if (previousParentComponent) {
      return previousParentComponent;
    }
    return parentComponents[0];
  }
  return null;
}
