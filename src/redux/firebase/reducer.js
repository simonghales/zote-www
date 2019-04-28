// @flow

import type { GenericAction } from '../editor/reducer';

export type FirebaseReduxState = {
  unsavedChanges: boolean,
};

export const initialFirebaseReduxState: FirebaseReduxState = {
  unsavedChanges: false,
};

const ACTION_HANDLERS = {};

export default function firebaseReducer(
  state: FirebaseReduxState = initialFirebaseReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
