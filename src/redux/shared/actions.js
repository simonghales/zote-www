// @flow

export const SHARED_CHANGES_SAVED = 'SHARED_CHANGES_SAVED';

type SharedChangesSavedAction = {
  type: string,
  payload: {},
};

export function reduxSetChangesSaved(): SharedChangesSavedAction {
  return {
    type: SHARED_CHANGES_SAVED,
    payload: {},
  };
}
