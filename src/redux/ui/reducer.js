// @flow

import { dummyUiReduxState } from '../../data/dummy/redux';
import type { GenericAction } from '../editor/reducer';

export type ComponentsSelectedBlockKeys = {
  [string]: string,
};

export type UIReduxState = {
  selectedComponentKey: string,
  componentsSelectedBlockKeys: ComponentsSelectedBlockKeys,
};

export const initialUiReduxState: UIReduxState = {
  selectedComponentKey: '',
  componentsSelectedBlockKeys: {},
  ...dummyUiReduxState,
};

const ACTION_HANDLERS = {};

export default function uiReducer(
  state: UIReduxState = initialUiReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
