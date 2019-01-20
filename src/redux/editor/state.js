// @flow

import type { ReduxState } from '../store';
import type { ComponentsModels } from '../../data/component/model';
import type { EditorReduxState } from './reducer';

export function getReduxEditorComponents(state: ReduxState): ComponentsModels {
  return state.editor.components;
}

export function getComponentsFromReduxEditorState(state: EditorReduxState): ComponentsModels {
  return state.components;
}
