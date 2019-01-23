// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';
import type { BlocksOrder } from '../../editor/components/ComponentSortable/ComponentSortable';
import { getComponentsFromReduxEditorState } from './state';
import { getBlockFromComponent, getComponentFromComponents } from '../../data/component/state';
import { updateComponentBlocksOrder } from '../../data/component/modifiers';
import { updateBlockPropValue } from '../../data/block/modifiers';

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

const SET_BLOCK_PROP_VALUE = 'SET_BLOCK_PROP_VALUE';

type SetBlockPropValuePayload = {
  componentKey: string,
  blockKey: string,
  propKey: string,
  value: any,
};

type SetBlockPropValueAction = {
  type: string,
  payload: SetBlockPropValuePayload,
};

export function setBlockPropValueRedux(
  componentKey: string,
  blockKey: string,
  propKey: string,
  value: any
): SetBlockPropValueAction {
  return {
    type: SET_BLOCK_PROP_VALUE,
    payload: {
      componentKey,
      blockKey,
      propKey,
      value,
    },
  };
}

function handleSetBlockPropValue(
  state: EditorReduxState,
  { componentKey, blockKey, propKey, value }: SetBlockPropValuePayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: {
        ...component,
        blocks: {
          ...component.blocks,
          [blockKey]: updateBlockPropValue(block, propKey, value),
        },
      },
    },
  };
}

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
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
