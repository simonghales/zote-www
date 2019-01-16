// @flow

import type { ReduxState } from '../store';

export function getReduxUiSelectedComponentKey(state: ReduxState): string {
  return state.ui.selectedComponentKey;
}
