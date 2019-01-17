// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';

export type EditorReduxState = {
  components: ComponentsModels,
};

export const initialEditorReduxState: EditorReduxState = {
  components: {},
  ...dummyEditorReduxState,
};

const ACTION_HANDLERS = {};

export type GenericAction = {
  type: string,
  payload: {},
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
