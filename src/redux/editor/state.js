// @flow

import type { ReduxState } from '../store';
import type { ComponentsModels } from '../../data/component/model';

export function getReduxEditorComponents(state: ReduxState): ComponentsModels {
  return state.editor.components;
}
