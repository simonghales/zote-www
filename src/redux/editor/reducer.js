// @flow

import type { ComponentModel, ComponentsModels } from '../../data/component/model';
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
  wrapBlockInComponentWithNewBlock,
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
import RepeaterBlock from '../../data/block/types/groups/functional/Repeater';
import type { PageModel, PagesModel } from '../../data/page/model';
import { updatePageDetails } from '../../data/page/modifiers';
import { SHARED_CHANGES_SAVED } from '../shared/actions';

export type EditorReduxState = {
  components: ComponentsModels,
  pages: PagesModel,
  unsavedChanges: boolean,
};

export const initialEditorReduxState: EditorReduxState = {
  components: {},
  pages: {},
  unsavedChanges: false,
  // ...dummyEditorReduxState,
};

export type GenericAction = {
  type: string,
  payload: {},
  undoGroup?: string,
};

function handleSetChangesSaved(state: EditorReduxState): EditorReduxState {
  return {
    ...state,
    unsavedChanges: false,
  };
}

const SET_EDITOR_STATE = 'SET_EDITOR_STATE';

type SetEditorStatePayload = {
  state: EditorReduxState,
};

type SetEditorStateAction = {
  type: string,
  payload: SetEditorStatePayload,
};

export function setEditorStateRedux(state: EditorReduxState): SetEditorStateAction {
  return {
    type: SET_EDITOR_STATE,
    payload: {
      state,
    },
  };
}

function handleSetEditorState(
  oldState: EditorReduxState,
  { state }: SetEditorStatePayload
): EditorReduxState {
  return {
    ...state,
  };
}

const ADD_NEW_COMPONENT = 'ADD_NEW_COMPONENT';

type AddNewComponentPayload = {
  component: ComponentModel,
};

type AddNewComponentAction = {
  type: string,
  payload: AddNewComponentPayload,
};

export function addNewComponentRedux(component: ComponentModel): AddNewComponentAction {
  return {
    type: ADD_NEW_COMPONENT,
    payload: {
      component,
    },
  };
}

function handleAddNewComponent(
  state: EditorReduxState,
  { component }: AddNewComponentPayload
): EditorReduxState {
  return {
    ...state,
    components: {
      ...state.components,
      [component.key]: component,
    },
    unsavedChanges: true,
  };
}

const ADD_NEW_PAGE = 'ADD_NEW_PAGE';

type AddNewPagePayload = {
  page: PageModel,
  component: ComponentModel,
};

type AddNewPageAction = {
  type: string,
  payload: AddNewPagePayload,
};

export function addNewPageRedux(page: PageModel, component: ComponentModel): AddNewPageAction {
  return {
    type: ADD_NEW_PAGE,
    payload: {
      page,
      component,
    },
  };
}

function handleAddNewPage(
  state: EditorReduxState,
  { page, component }: AddNewPagePayload
): EditorReduxState {
  return {
    ...state,
    pages: {
      ...state.pages,
      [page.key]: page,
    },
    components: {
      ...state.components,
      [component.key]: component,
    },
    unsavedChanges: true,
  };
}

const UPDATE_PAGE_DETAILS = 'UPDATE_PAGE_DETAILS';

type UpdatePageDetailsPayload = {
  name: string,
  slug: string,
  pageKey: string,
};

type UpdatePageDetailsAction = {
  type: string,
  payload: UpdatePageDetailsPayload,
};

export function updatePageDetailsRedux(
  pageKey: string,
  name: string,
  slug: string
): UpdatePageDetailsAction {
  return {
    type: UPDATE_PAGE_DETAILS,
    payload: {
      name,
      slug,
      pageKey,
    },
  };
}

function handleUpdatePageDetailsRedux(
  state: EditorReduxState,
  { name, slug, pageKey }: UpdatePageDetailsPayload
): EditorReduxState {
  return {
    ...state,
    pages: {
      ...state.pages,
      [pageKey]: updatePageDetails(state.pages[pageKey], name, slug),
    },
    unsavedChanges: true,
  };
}

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

function handleWrapBlockWithRepeater(
  state: EditorReduxState,
  { componentKey, blockKey }: WrapBlockWithRepeaterPayload
): EditorReduxState {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const repeaterBlock = RepeaterBlock.generate({});
  const updatedComponent = wrapBlockInComponentWithNewBlock(component, blockKey, repeaterBlock);
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: updatedComponent,
    },
    unsavedChanges: true,
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
  );
  return {
    ...state,
    components: {
      ...components,
      [componentKey]: updatedComponent,
      [newComponent.key]: newComponent,
    },
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
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
    undoGroup: `${componentKey}:${blockKey}:${propKey}`,
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
    unsavedChanges: true,
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
    unsavedChanges: true,
  };
}

const ACTION_HANDLERS = {
  [SHARED_CHANGES_SAVED]: handleSetChangesSaved,
  [SET_EDITOR_STATE]: handleSetEditorState,
  [ADD_NEW_COMPONENT]: handleAddNewComponent,
  [ADD_NEW_PAGE]: handleAddNewPage,
  [UPDATE_PAGE_DETAILS]: handleUpdatePageDetailsRedux,
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

export const EDITOR_UNDOABLE_ACTIONS = [
  ADD_NEW_COMPONENT,
  ADD_NEW_PAGE,
  UPDATE_PAGE_DETAILS,
  WRAP_BLOCK_WITH_REPEATER,
  CONVERT_BLOCK_INTO_COMPONENT,
  SET_BLOCK_NAME,
  DELETE_BLOCK_FROM_COMPONENT,
  ADD_BLOCK_TO_COMPONENT,
  UPDATE_BLOCK_PROP_CONFIG,
  REMOVE_BLOCK_PROP_LINK,
  SET_BLOCK_PROP_VALUE,
  SET_BLOCK_PROP_LINKED,
  UPDATE_COMPONENT_BLOCKS_ORDER,
  ADD_NEW_PROP_TO_BLOCK,
];

export default function editorReducer(
  state: EditorReduxState = initialEditorReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
