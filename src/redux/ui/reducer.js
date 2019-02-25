// @flow

import { dummyUiReduxState } from '../../data/dummy/redux';
import type { GenericAction } from '../editor/reducer';
import { customFormSection } from '../../editor/components/EditorComponentForm/data/styles';

export type ComponentsSelectedBlockKeys = {
  [string]: string,
};

export type EditorFormSectionsVisibility = {
  [string]: boolean,
};

export type UIReduxState = {
  selectedComponentKey: string,
  componentsSelectedBlockKeys: ComponentsSelectedBlockKeys,
  editorFormSectionsVisibility: EditorFormSectionsVisibility,
};

export const initialUiReduxState: UIReduxState = {
  selectedComponentKey: '',
  componentsSelectedBlockKeys: {},
  editorFormSectionsVisibility: {
    [customFormSection.key]: false,
  },
  ...dummyUiReduxState,
};

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
  [SET_COMPONENT_SELECTED_BLOCK_KEY]: handleSetComponentSelectedBlockKey,
  [SET_EDITOR_FORM_SECTION_VISIBILITY]: handleSetEditorFormSectionVisibility,
};

export default function uiReducer(
  state: UIReduxState = initialUiReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
