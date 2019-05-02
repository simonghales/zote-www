// @flow

import type { GenericAction } from '../editor/reducer';

export type FirebaseReduxState = {
  loadedSiteKey: string,
};

export const initialFirebaseReduxState: FirebaseReduxState = {
  loadedSiteKey: '',
};

const SET_LOADED_SITE_KEY = 'SET_LOADED_SITE_KEY';

type SetLoadedSiteKeyPayload = {
  siteKey: string,
};

type SetLoadedSiteKeyAction = {
  type: string,
  payload: SetLoadedSiteKeyPayload,
};

export function setLoadedSiteKeyRedux(siteKey: string): SetLoadedSiteKeyAction {
  return {
    type: SET_LOADED_SITE_KEY,
    payload: {
      siteKey,
    },
  };
}

function handleSetLoadedSiteKey(
  state: FirebaseReduxState,
  { siteKey }: SetLoadedSiteKeyPayload
): FirebaseReduxState {
  return {
    ...state,
    siteKey,
  };
}

const ACTION_HANDLERS = {
  [SET_LOADED_SITE_KEY]: handleSetLoadedSiteKey,
};

export default function firebaseReducer(
  state: FirebaseReduxState = initialFirebaseReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
