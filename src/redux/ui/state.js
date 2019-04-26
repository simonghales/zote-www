// @flow

import type { ReduxState } from '../store';
import type {
  ComponentsSelectedBlockKeys,
  EditorFormSectionsVisibility,
  UIReduxState,
} from './reducer';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';

export function getReduxUiSelectedComponentKey(state: UIReduxState): string {
  return state.selectedComponentKey;
}

export function getReduxSelectedComponentKey(state: ReduxState): string {
  return getReduxUiSelectedComponentKey(state.ui);
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

export function getReduxUiHoveredBlockKey(state: ReduxState): string {
  return state.ui.hoveredBlockKey;
}

export function getReduxUiPreviousComponentKey(state: UIReduxState): string {
  const { selectedComponentKeyHistory } = state;
  if (selectedComponentKeyHistory.length > 0) {
    return selectedComponentKeyHistory[0];
  }
  return '';
}

export function getReduxPreviousComponentKey(state: ReduxState): string {
  return getReduxUiPreviousComponentKey(state.ui);
}

export function getSelectedPageKeyFromUIReduxState(state: UIReduxState): string {
  return state.selectedPageKey;
}

export function getSelectedPreviewComponentKeyFromUIReduxState(state: UIReduxState): string {
  return state.selectedPreviewComponentKey;
}
