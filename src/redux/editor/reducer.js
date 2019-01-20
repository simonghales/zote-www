// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';
import type { BlocksOrder } from '../../editor/components/ComponentSortable/ComponentSortable';
import { getComponentsFromReduxEditorState } from './state';
import { getComponentFromComponents } from '../../data/component/state';
import { updateComponentBlocksOrder } from '../../data/component/modifiers';

export type EditorReduxState = {
  components: ComponentsModels,
};

export const initialEditorReduxState: EditorReduxState = {
  components: {},
  ...dummyEditorReduxState,
};

export type GenericAction = {
  type: string,
  payload: {},
};

const UPDATE_COMPONENT_BLOCKS_ORDER = 'UPDATE_COMPONENT_BLOCKS_ORDER';

type UpdateComponentBlocksOrderPayload = {
  blocksOrder: BlocksOrder,
  rootBlocksKeysOrder: Array<string>,
  componentKey: string,
};

type UpdateComponentBlocksOrderAction = {
  type: string,
  payload: UpdateComponentBlocksOrderPayload,
};

export function updateComponentBlocksOrderRedux(
  blocksOrder: BlocksOrder,
  rootBlocksKeysOrder: Array<string>,
  componentKey: string
): UpdateComponentBlocksOrderAction {
  return {
    type: UPDATE_COMPONENT_BLOCKS_ORDER,
    payload: {
      blocksOrder,
      rootBlocksKeysOrder,
      componentKey,
    },
  };
}

function handleUpdateComponentBlocksOrder(
  state: EditorReduxState,
  { blocksOrder, rootBlocksKeysOrder, componentKey }: UpdateComponentBlocksOrderPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const updatedComponent = updateComponentBlocksOrder(component, blocksOrder, rootBlocksKeysOrder);
  console.log('updatedComponent', updatedComponent);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: updateComponentBlocksOrder(component, blocksOrder, rootBlocksKeysOrder),
    },
  };
}

const ACTION_HANDLERS = {
  [UPDATE_COMPONENT_BLOCKS_ORDER]: handleUpdateComponentBlocksOrder,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
