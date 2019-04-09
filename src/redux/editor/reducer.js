// @flow

import type { ComponentsModels } from '../../data/component/model';
import { dummyEditorReduxState } from '../../data/dummy/redux';
import type { BlocksOrder } from '../../editor/components/ComponentSortable/ComponentSortable';
import { getComponentsFromReduxEditorState } from './state';
import {
  getBlockFromComponent,
  getBlocksFromComponent,
  getComponentFromComponents,
  getComponentName,
  getRootBlockKeyFromComponent,
} from '../../data/component/state';
import {
  addBlockToComponent,
  createNewComponentFromComponentBlock,
  removeBlockFromComponent,
  updateComponentBlocksOrder,
} from '../../data/component/modifiers';
import {
  addNewPropToBlock,
  updateBlockName,
  updateBlockPropConfig,
  updateBlockPropLinked,
  updateBlockPropRemoveLink,
  updateBlockPropValue,
} from '../../data/block/modifiers';
import type { BlockPropsConfigTypes } from '../../data/block/props/model';
import { getBlockParentBlockKeyFromBlocks, getBlockPropsConfigKeys } from '../../data/block/state';
import { generatePropKeyFromPropLabel } from '../../data/block/props/generators';
import type { BlockModel } from '../../data/block/model';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { generateComponentImportBlock } from '../../data/block/types/groups/component/ComponentImport/generate';

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

const WRAP_BLOCK_WITH_REPEATER = 'WRAP_BLOCK_WITH_REPEATER';

type WrapBlockWithRepeaterPayload = {
  componentKey: string,
  blockKey: string,
};

type WrapBlockWithRepeaterAction = {
  type: string,
  payload: WrapBlockWithRepeaterPayload,
};

export function wrapBlockWithRepeaterRedux(
  componentKey: string,
  blockKey: string
): WrapBlockWithRepeaterAction {
  return {
    type: WRAP_BLOCK_WITH_REPEATER,
    payload: {
      componentKey,
      blockKey,
    },
  };
}

function handleWrapBlockWithRepeater(state: EditorReduxState): EditorReduxState {
  return {
    ...state,
  };
}

const CONVERT_BLOCK_INTO_COMPONENT = 'CONVERT_BLOCK_INTO_COMPONENT';

type ConvertBlockIntoComponentPayload = {
  componentKey: string,
  blockKey: string,
};

type ConvertBlockIntoComponentAction = {
  type: string,
  payload: ConvertBlockIntoComponentPayload,
};

export function convertBlockIntoComponentRedux(
  componentKey: string,
  blockKey: string
): ConvertBlockIntoComponentAction {
  return {
    type: CONVERT_BLOCK_INTO_COMPONENT,
    payload: {
      componentKey,
      blockKey,
    },
  };
}

function handleConvertBlockIntoComponent(
  state: EditorReduxState,
  { componentKey, blockKey }: ConvertBlockIntoComponentPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const newComponent = createNewComponentFromComponentBlock(component, blockKey);
  const newComponentBlock = generateComponentImportBlock(
    newComponent.key,
    getComponentName(newComponent)
  );
  const blocks = getBlocksFromComponent(component);
  let parentBlockKey = getBlockParentBlockKeyFromBlocks(blockKey, blocks);
  if (!parentBlockKey) {
    parentBlockKey = getRootBlockKeyFromComponent(component);
  }
  let updatedComponent = removeBlockFromComponent(component, blockKey, true);
  updatedComponent = addBlockToComponent(
    updatedComponent,
    newComponentBlock,
    parentBlockKey,
    ADD_BLOCK_POSITIONS.inside
  ); // todo - add in exact position
  console.log('updatedComponent', updatedComponent);
  console.log('newComponent', newComponent);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: updatedComponent,
      [newComponent.key]: newComponent,
    },
  };
}

const SET_BLOCK_NAME = 'SET_BLOCK_NAME';

type SetBlockNamePayload = {
  componentKey: string,
  blockKey: string,
  name: string,
};

type SetBlockNameAction = {
  type: string,
  payload: SetBlockNamePayload,
};

export function setBlockNameRedux(
  componentKey: string,
  blockKey: string,
  name: string
): SetBlockNameAction {
  return {
    type: SET_BLOCK_NAME,
    payload: {
      componentKey,
      blockKey,
      name,
    },
  };
}

function handleSetBlockName(
  state: EditorReduxState,
  { componentKey, blockKey, name }: SetBlockNamePayload
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
          [blockKey]: updateBlockName(block, name),
        },
      },
    },
  };
}

const DELETE_BLOCK_FROM_COMPONENT = 'DELETE_BLOCK_FROM_COMPONENT';

type DeleteBlockFromComponentPayload = {
  componentKey: string,
  blockKey: string,
  deleteChildren: boolean,
};

type DeleteBlockFromComponentAction = {
  type: string,
  payload: DeleteBlockFromComponentPayload,
};

export function deleteBlockFromComponentRedux(
  componentKey: string,
  blockKey: string,
  deleteChildren: boolean
): DeleteBlockFromComponentAction {
  return {
    type: DELETE_BLOCK_FROM_COMPONENT,
    payload: {
      componentKey,
      blockKey,
      deleteChildren,
    },
  };
}

function handleDeleteBlockFromComponent(
  state: EditorReduxState,
  { componentKey, blockKey, deleteChildren }: DeleteBlockFromComponentPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: removeBlockFromComponent(component, blockKey, deleteChildren),
    },
  };
}

const ADD_BLOCK_TO_COMPONENT = 'ADD_BLOCK_TO_COMPONENT';

type AddBlockToComponentPayload = {
  componentKey: string,
  block: BlockModel,
  selectedBlockKey: string,
  selectedPosition: AddBlockPositions,
};

type AddBlockToComponentAction = {
  type: string,
  payload: AddBlockToComponentPayload,
};

export function addBlockToComponentRedux(
  componentKey: string,
  block: BlockModel,
  selectedBlockKey: string,
  selectedPosition: AddBlockPositions
): AddBlockToComponentAction {
  return {
    type: ADD_BLOCK_TO_COMPONENT,
    payload: {
      componentKey,
      block,
      selectedBlockKey,
      selectedPosition,
    },
  };
}

function handleAddBlockToComponent(
  state: EditorReduxState,
  { componentKey, block, selectedBlockKey, selectedPosition }: AddBlockToComponentPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: addBlockToComponent(component, block, selectedBlockKey, selectedPosition),
    },
  };
}

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

const REMOVE_BLOCK_PROP_LINK = 'REMOVE_BLOCK_PROP_LINK';

type RemoveBlockPropLinkPayload = {
  componentKey: string,
  blockKey: string,
  propKey: string,
};

type RemoveBlockPropLinkAction = {
  type: string,
  payload: RemoveBlockPropLinkPayload,
};

export function removeBlockPropLinkRedux(
  componentKey: string,
  blockKey: string,
  propKey: string
): RemoveBlockPropLinkAction {
  return {
    type: REMOVE_BLOCK_PROP_LINK,
    payload: {
      componentKey,
      blockKey,
      propKey,
    },
  };
}

function handleRemoveBlockPropLink(
  state: EditorReduxState,
  { componentKey, blockKey, propKey }: RemoveBlockPropLinkPayload
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
          [blockKey]: updateBlockPropRemoveLink(block, propKey),
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
  fieldKey?: string,
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
  selectedPropKey: string,
  fieldKey?: string
): SetBlockPropLinkedAction {
  return {
    type: SET_BLOCK_PROP_LINKED,
    payload: {
      componentKey,
      blockKey,
      propKey,
      selectedBlockKey,
      selectedPropKey,
      fieldKey,
    },
  };
}

function handleSetBlockPropLinked(
  state: EditorReduxState,
  {
    componentKey,
    blockKey,
    propKey,
    selectedBlockKey,
    selectedPropKey,
    fieldKey,
  }: SetBlockPropLinkedPayload
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
          [blockKey]: updateBlockPropLinked(
            block,
            propKey,
            selectedBlockKey,
            selectedPropKey,
            fieldKey
          ),
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
  [WRAP_BLOCK_WITH_REPEATER]: handleWrapBlockWithRepeater,
  [CONVERT_BLOCK_INTO_COMPONENT]: handleConvertBlockIntoComponent,
  [SET_BLOCK_NAME]: handleSetBlockName,
  [DELETE_BLOCK_FROM_COMPONENT]: handleDeleteBlockFromComponent,
  [ADD_BLOCK_TO_COMPONENT]: handleAddBlockToComponent,
  [UPDATE_BLOCK_PROP_CONFIG]: handleUpdateBlockPropConfig,
  [ADD_NEW_PROP_TO_BLOCK]: handleAddNewPropToBlock,
  [UPDATE_COMPONENT_BLOCKS_ORDER]: handleUpdateComponentBlocksOrder,
  [REMOVE_BLOCK_PROP_LINK]: handleRemoveBlockPropLink,
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
