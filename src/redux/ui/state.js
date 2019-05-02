// @flow

import type { ReduxDataState, ReduxRootState } from '../store';
import type {
  ComponentsSelectedBlockKeys,
  EditorFormSectionsVisibility,
  UIReduxState,
} from './reducer';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { getReduxUIState } from '../shared/state';

export function getReduxUiSelectedComponentKey(state: UIReduxState): string {
  return state.selectedComponentKey;
}

export function getReduxSelectedComponentKey(state: ReduxRootState): string {
  return getReduxUiSelectedComponentKey(state.ui);
}

export function getReduxUiComponentsSelectedBlockKeys(
  state: ReduxRootState
): ComponentsSelectedBlockKeys {
  const uiState = getReduxUIState(state);
  return uiState.componentsSelectedBlockKeys;
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

export function getReduxUiAddingBlock(state: UIReduxState): boolean {
  return state.addingBlock;
}

export function getReduxUiAddingBlockSelectedKey(state: ReduxRootState): string {
  return state.ui.addingBlockSelectedKey;
}

export function getReduxUiAddingBlockSelectedPosition(state: ReduxRootState): AddBlockPositions {
  return state.ui.addingBlockSelectedPosition;
}

export function getReduxUiHoveredBlockKey(state: ReduxRootState): string {
  return state.ui.hoveredBlockKey;
}

export function getReduxUiPreviousComponentKey(state: UIReduxState): string {
  const { selectedComponentKeyHistory } = state;
  if (selectedComponentKeyHistory.length > 0) {
    return selectedComponentKeyHistory[0];
  }
  return '';
}

export function getReduxPreviousComponentKey(state: ReduxRootState): string {
  return getReduxUiPreviousComponentKey(state.ui);
}

export function getSelectedPageKeyFromUIReduxState(state: UIReduxState): string {
  return state.selectedPageKey;
}

export function getSelectedPreviewComponentKeyFromUIReduxState(state: UIReduxState): string {
  return state.selectedPreviewComponentKey;
}

export function getSiteKeyFromUIState(state: UIReduxState): string {
  return state.siteKey;
}

export function getSiteKeyFromRootReduxState(state: ReduxRootState): string {
  return getSiteKeyFromUIState(getReduxUIState(state));
}
