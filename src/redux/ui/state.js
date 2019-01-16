// @flow

import type { ReduxState } from '../store';
import type { UIReduxState } from './reducer';

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
