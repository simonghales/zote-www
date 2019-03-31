// @flow

import type { ReduxState } from '../store';
import type {
  ComponentsSelectedBlockKeys,
  EditorFormSectionsVisibility,
  UIReduxState,
} from './reducer';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';

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
