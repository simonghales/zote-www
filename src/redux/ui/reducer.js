// @flow

import { dummyUiReduxState } from '../../data/dummy/redux';
import type { GenericAction } from '../editor/reducer';
import { customFormSection } from '../../editor/components/EditorComponentForm/data/styles';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { getSelectedComponentKeySelector } from '../../editor/state/reselect/component';
import {
  getReduxSelectedComponentKey,
  getReduxPreviousComponentKey,
  getReduxUiSelectedComponentKey,
  getReduxUiPreviousComponentKey,
} from './state';

export type ComponentsSelectedBlockKeys = {
  [string]: string,
};

export type EditorFormSectionsVisibility = {
  [string]: boolean,
};

export type UIReduxState = {
  hoveredBlockKey: string,
  addingBlock: boolean,
  addingBlockSelectedKey: string,
  addingBlockSelectedPosition: AddBlockPositions,
  selectedComponentKey: string,
  selectedComponentKeyHistory: Array<string>,
  componentsSelectedBlockKeys: ComponentsSelectedBlockKeys,
  editorFormSectionsVisibility: EditorFormSectionsVisibility,
};

export const initialUiReduxState: UIReduxState = {
  hoveredBlockKey: '',
  addingBlock: false,
  addingBlockSelectedKey: '',
  addingBlockSelectedPosition: ADD_BLOCK_POSITIONS.inside,
  selectedComponentKey: '',
  selectedComponentKeyHistory: [],
  componentsSelectedBlockKeys: {},
  editorFormSectionsVisibility: {
    [customFormSection.key]: false,
  },
};

const SET_SELECTED_COMPONENT_KEY = 'SET_SELECTED_COMPONENT_KEY';

type SetSelectedComponentKeyPayload = {
  componentKey: string,
  previousComponentKey?: string,
};

type SetSelectedComponentKeyAction = {
  type: string,
  payload: SetSelectedComponentKeyPayload,
};

export function setSelectedComponentKeyRedux(
  componentKey: string,
  previousComponentKey?: string
): SetSelectedComponentKeyAction {
  return {
    type: SET_SELECTED_COMPONENT_KEY,
    payload: {
      componentKey,
      previousComponentKey,
    },
  };
}

function handleSetSelectedComponentKey(
  state: UIReduxState,
  { componentKey, previousComponentKey = '' }: SetSelectedComponentKeyPayload
): UIReduxState {
  console.log('handleSetSelectedComponentKey');
  // const currentSelectedModuleKey = getSelectedModuleKeyFromUIState(state);
  // const currentPreviousModuleKey =
  //   state.selectedModulesHistory.length > 0
  //     ? state.selectedModulesHistory[state.selectedModulesHistory.length - 1]
  //     : '';
  // let updatedSelectedModulesHistory = state.selectedModulesHistory.slice();
  // if (moduleKey === currentPreviousModuleKey) {
  //   updatedSelectedModulesHistory.pop();
  // } else if (previousModuleKey) {
  //   updatedSelectedModulesHistory = updatedSelectedModulesHistory.concat([
  //     currentSelectedModuleKey,
  //   ]);
  // }

  console.log('componentKey', componentKey);

  const currentSelectedComponentKey = getReduxUiSelectedComponentKey(state);
  const currentPreviousComponentKey = getReduxUiPreviousComponentKey(state);
  const { selectedComponentKeyHistory } = state;
  let updatedComponentKeyHistory = selectedComponentKeyHistory.slice();

  console.log('currentPreviousComponentKey', currentPreviousComponentKey);
  console.log('currentSelectedComponentKey', currentSelectedComponentKey);

  if (componentKey === currentPreviousComponentKey) {
    updatedComponentKeyHistory.pop();
  } else if (previousComponentKey) {
    const update = currentSelectedComponentKey
      ? [currentSelectedComponentKey]
      : [previousComponentKey];
    updatedComponentKeyHistory = updatedComponentKeyHistory.concat(update);
  }
  return {
    ...state,
    selectedComponentKey: componentKey,
    selectedComponentKeyHistory: updatedComponentKeyHistory,
  };
}

const SET_HOVERED_BLOCK_KEY = 'SET_HOVERED_BLOCK_KEY';

type SetHoveredBlockKeyPayload = {
  blockKey: string,
};

type SetHoveredBlockKeyAction = {
  type: string,
  payload: SetHoveredBlockKeyPayload,
};

export function setHoveredBlockKeyRedux(blockKey: string): SetHoveredBlockKeyAction {
  return {
    type: SET_HOVERED_BLOCK_KEY,
    payload: {
      blockKey,
    },
  };
}

function handleSetHoveredBlockKey(
  state: UIReduxState,
  { blockKey }: SetHoveredBlockKeyPayload
): UIReduxState {
  return {
    ...state,
    hoveredBlockKey: blockKey,
  };
}

const SET_ADDING_BLOCK_SELECTED = 'SET_ADDING_BLOCK_SELECTED';

type SetAddingBlockSelectedPayload = {
  blockKey: string,
  position: AddBlockPositions,
};

type SetAddingBlockSelectedAction = {
  type: string,
  payload: SetAddingBlockSelectedPayload,
};

export function setAddingBlockSelectedRedux(
  blockKey: string,
  position: AddBlockPositions
): SetAddingBlockSelectedAction {
  return {
    type: SET_ADDING_BLOCK_SELECTED,
    payload: {
      blockKey,
      position,
    },
  };
}

function handleSetAddingBlockSelected(
  state: UIReduxState,
  { blockKey, position }: SetAddingBlockSelectedPayload
): UIReduxState {
  return {
    ...state,
    addingBlockSelectedKey: blockKey,
    addingBlockSelectedPosition: position,
  };
}

const SET_ADDING_BLOCK = 'SET_ADDING_BLOCK';

type SetAddingBlockPayload = {
  addingBlock: boolean,
};

type SetAddingBlockAction = {
  type: string,
  payload: SetAddingBlockPayload,
};

export function setAddingBlockRedux(addingBlock: boolean): SetAddingBlockAction {
  return {
    type: SET_ADDING_BLOCK,
    payload: {
      addingBlock,
    },
  };
}

function handleSetAddingBlock(
  state: UIReduxState,
  { addingBlock }: SetAddingBlockPayload
): UIReduxState {
  return {
    ...state,
    addingBlock,
  };
}

const SET_COMPONENT_SELECTED_BLOCK_KEY = 'SET_COMPONENT_SELECTED_BLOCK_KEY';

type SetComponentSelectedBlockKeyPayload = {
  componentKey: string,
  blockKey: string,
};

type SetComponentSelectedBlockKeyAction = {
  type: string,
  payload: SetComponentSelectedBlockKeyPayload,
};

export function setComponentSelectedBlockKeyRedux(
  componentKey: string,
  blockKey: string
): SetComponentSelectedBlockKeyAction {
  return {
    type: SET_COMPONENT_SELECTED_BLOCK_KEY,
    payload: {
      componentKey,
      blockKey,
    },
  };
}

function handleSetComponentSelectedBlockKey(
  state: UIReduxState,
  { componentKey, blockKey }: SetComponentSelectedBlockKeyPayload
): UIReduxState {
  return {
    ...state,
    componentsSelectedBlockKeys: {
      ...state.componentsSelectedBlockKeys,
      [componentKey]: blockKey,
    },
  };
}

const SET_EDITOR_FORM_SECTION_VISIBILITY = 'SET_EDITOR_FORM_SECTION_VISIBILITY';

type SetEditorFormSectionVisibilityPayload = {
  sectionKey: string,
  visible: boolean,
};

type SetEditorFormSectionVisibilityAction = {
  type: string,
  payload: SetEditorFormSectionVisibilityPayload,
};

export function setEditorFormSectionVisibilityRedux(
  sectionKey: string,
  visible: boolean
): SetEditorFormSectionVisibilityAction {
  return {
    type: SET_EDITOR_FORM_SECTION_VISIBILITY,
    payload: {
      sectionKey,
      visible,
    },
  };
}

function handleSetEditorFormSectionVisibility(
  state: UIReduxState,
  { sectionKey, visible }: SetEditorFormSectionVisibilityPayload
): UIReduxState {
  return {
    ...state,
    editorFormSectionsVisibility: {
      ...state.editorFormSectionsVisibility,
      [sectionKey]: visible,
    },
  };
}

const ACTION_HANDLERS = {
  [SET_HOVERED_BLOCK_KEY]: handleSetHoveredBlockKey,
  [SET_ADDING_BLOCK_SELECTED]: handleSetAddingBlockSelected,
  [SET_ADDING_BLOCK]: handleSetAddingBlock,
  [SET_COMPONENT_SELECTED_BLOCK_KEY]: handleSetComponentSelectedBlockKey,
  [SET_EDITOR_FORM_SECTION_VISIBILITY]: handleSetEditorFormSectionVisibility,
  [SET_SELECTED_COMPONENT_KEY]: handleSetSelectedComponentKey,
};

export default function uiReducer(
  state: UIReduxState = initialUiReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
