// @flow

import { EDITOR_UNDOABLE_ACTIONS } from './editor/reducer';
import type { GenericAction } from './editor/reducer';
import type { ReduxRootState } from './store';
import { STYLES_UNDOABLE_ACTIONS } from './styles/reducer';

const previousAction: GenericAction | null = null;

export function groupHistory(
  action: GenericAction,
  currentState: ReduxRootState,
  previousHistory: ReduxRootState
) {
  const { undoGroup = null } = action;
  // console.log(`undoGroup`, undoGroup);
  return undoGroup;
  // return null;
}

export const FILTER_ALLOWED_ACTIONS = [...EDITOR_UNDOABLE_ACTIONS, ...STYLES_UNDOABLE_ACTIONS];
