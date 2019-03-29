// @flow

import type { ReduxState } from '../store';
import type {
  ComponentsSelectedBlockKeys,
  EditorFormSectionsVisibility,
  UIReduxState,
} from './reducer';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { getSelectedComponentSelector } from '../../editor/state/reselect/component';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { isBlockInComponent } from '../../data/component/state';
import { doesBlockAllowChildBlocks } from '../../data/block/state';
import { getComponentBlockFromReduxEditorState } from '../editor/state';

export function getReduxUiSelectedComponentKey(state: ReduxState): string {
  return state.ui.selectedComponentKey;
}

export function getReduxUiComponentsSelectedBlockKeys(
  state: ReduxState
): ComponentsSelectedBlockKeys {
  return state.ui.componentsSelectedBlockKeys;
}

export function getComponentSelectedBlockKey(
  componentKey: string,
  componentsSelectedBlockKeys: ComponentsSelectedBlockKeys
): string {
  return componentsSelectedBlockKeys[componentKey] ? componentsSelectedBlockKeys[componentKey] : '';
}

export function getReduxUiComponentSelectedBlockKey(
  state: UIReduxState,
  componentKey: string
): string {
  return getComponentSelectedBlockKey(componentKey, state.componentsSelectedBlockKeys);
}

export function getEditorFormSectionsVisibility(state: UIReduxState): EditorFormSectionsVisibility {
  return state.editorFormSectionsVisibility;
}

export function getReduxUiAddingBlock(state: ReduxState): boolean {
  return state.ui.addingBlock;
}

export function getReduxUiAddingBlockSelectedKey(state: ReduxState): string {
  return state.ui.addingBlockSelectedKey;
}

export function getReduxUiAddingBlockSelectedPosition(state: ReduxState): AddBlockPositions {
  return state.ui.addingBlockSelectedPosition;
}

export function getReduxSafeAddingBlockSelectedKeyAndPosition(
  state: ReduxState
): [string, AddBlockPositions] {
  const component = getSelectedComponentSelector(state);
  let blockKey = getReduxUiAddingBlockSelectedKey(state);
  let position = getReduxUiAddingBlockSelectedPosition(state);
  if (!isBlockInComponent(component, blockKey)) {
    blockKey = getReduxUiComponentSelectedBlockKey(state.ui, component.key);
    const block = getComponentBlockFromReduxEditorState(state.editor, component.key, blockKey);
    if (!doesBlockAllowChildBlocks(block)) {
      position = ADD_BLOCK_POSITIONS.before;
    } else {
      position = ADD_BLOCK_POSITIONS.inside;
    }
  }
  return [blockKey, position];
}
