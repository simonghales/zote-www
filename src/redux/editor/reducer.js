// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';
import type { BlocksOrder } from '../../editor/components/ComponentSortable/ComponentSortable';
import { getComponentsFromReduxEditorState } from './state';
import { getBlockFromComponent, getComponentFromComponents } from '../../data/component/state';
import { updateComponentBlocksOrder } from '../../data/component/modifiers';
import {
  addNewPropToBlock,
  updateBlockPropConfig,
  updateBlockPropLinked,
  updateBlockPropValue,
} from '../../data/block/modifiers';
import type { BlockPropsConfigTypes } from '../../data/block/props/model';
import { getBlockPropsConfigKeys } from '../../data/block/state';
import { generatePropKeyFromPropLabel } from '../../data/block/props/generators';

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

const UPDATE_BLOCK_PROP_CONFIG = 'UPDATE_BLOCK_PROP_CONFIG';

type UpdateBlockPropConfigPayload = {
  componentKey: string,
  blockKey: string,
  propKey: string,
  propLabel: string,
  propType: BlockPropsConfigTypes,
};

type UpdateBlockPropConfigAction = {
  type: string,
  payload: UpdateBlockPropConfigPayload,
};

export function updateBlockPropConfigRedux(
  componentKey: string,
  blockKey: string,
  propKey: string,
  propLabel: string,
  propType: BlockPropsConfigTypes
): UpdateBlockPropConfigAction {
  return {
    type: UPDATE_BLOCK_PROP_CONFIG,
    payload: {
      componentKey,
      blockKey,
      propKey,
      propLabel,
      propType,
    },
  };
}

function handleUpdateBlockPropConfig(
  state: EditorReduxState,
  { componentKey, blockKey, propKey, propLabel, propType }
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const propKeys = getBlockPropsConfigKeys(block).filter(blockPropKey => blockPropKey !== propKey);
  const updatedPropKey = generatePropKeyFromPropLabel(propLabel, propKeys);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: {
        ...component,
        blocks: {
          ...component.blocks,
          [blockKey]: updateBlockPropConfig(block, propKey, updatedPropKey, propType, propLabel),
        },
      },
    },
  };
}

const ADD_NEW_PROP_TO_BLOCK = 'ADD_NEW_PROP_TO_BLOCK';

type AddNewPropToBlockPayload = {
  componentKey: string,
  blockKey: string,
  propType: BlockPropsConfigTypes,
  propLabel: string,
};

type AddNewPropToBlockAction = {
  type: string,
  payload: AddNewPropToBlockPayload,
};

export function addNewPropToBlockRedux(
  componentKey: string,
  blockKey: string,
  propType: BlockPropsConfigTypes,
  propLabel: string
): AddNewPropToBlockAction {
  return {
    type: ADD_NEW_PROP_TO_BLOCK,
    payload: {
      componentKey,
      blockKey,
      propType,
      propLabel,
    },
  };
}

function handleAddNewPropToBlock(
  state: EditorReduxState,
  { componentKey, blockKey, propType, propLabel }: AddNewPropToBlockPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const propKeys = getBlockPropsConfigKeys(block);
  const propKey = generatePropKeyFromPropLabel(propLabel, propKeys);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: {
        ...component,
        blocks: {
          ...component.blocks,
          [blockKey]: addNewPropToBlock(block, propKey, propType, propLabel),
        },
      },
    },
  };
}

const SET_BLOCK_PROP_LINKED = 'SET_BLOCK_PROP_LINKED';

type SetBlockPropLinkedPayload = {
  componentKey: string,
  blockKey: string,
  propKey: string,
  selectedBlockKey: string,
  selectedPropKey: string,
};

type SetBlockPropLinkedAction = {
  type: string,
  payload: SetBlockPropLinkedPayload,
};

export function setBlockPropLinkedRedux(
  componentKey: string,
  blockKey: string,
  propKey: string,
  selectedBlockKey: string,
  selectedPropKey: string
): SetBlockPropLinkedAction {
  return {
    type: SET_BLOCK_PROP_LINKED,
    payload: {
      componentKey,
      blockKey,
      propKey,
      selectedBlockKey,
      selectedPropKey,
    },
  };
}

function handleSetBlockPropLinked(
  state: EditorReduxState,
  { componentKey, blockKey, propKey, selectedBlockKey, selectedPropKey }: SetBlockPropLinkedPayload
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
          [blockKey]: updateBlockPropLinked(block, propKey, selectedBlockKey, selectedPropKey),
        },
      },
    },
  };
}

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
  [UPDATE_BLOCK_PROP_CONFIG]: handleUpdateBlockPropConfig,
  [ADD_NEW_PROP_TO_BLOCK]: handleAddNewPropToBlock,
  [UPDATE_COMPONENT_BLOCKS_ORDER]: handleUpdateComponentBlocksOrder,
  [SET_BLOCK_PROP_LINKED]: handleSetBlockPropLinked,
  [SET_BLOCK_PROP_VALUE]: handleSetBlockPropValue,
};

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
