// @flow

import type { GenericAction } from '../editor/reducer';

export type FirebaseReduxState = {};

export const initialFirebaseReduxState: FirebaseReduxState = {};

const ACTION_HANDLERS = {};

export default function firebaseReducer(
  state: FirebaseReduxState = initialFirebaseReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
