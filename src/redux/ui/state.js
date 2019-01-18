// @flow

import type { ReduxState } from '../store';
import type { EditorFormSectionsVisibility, UIReduxState } from './reducer';

export function getReduxUiSelectedComponentKey(state: ReduxState): string {
  return state.ui.selectedComponentKey;
}

export function getReduxUiComponentSelectedBlockKey(
  state: UIReduxState,
  componentKey: string
): string {
  return state.componentsSelectedBlockKeys[componentKey]
    ? state.componentsSelectedBlockKeys[componentKey]
    : '';
}

export function getEditorFormSectionsVisibility(state: UIReduxState): EditorFormSectionsVisibility {
  return state.editorFormSectionsVisibility;
}
