// @flow

import { dummyUiReduxState } from '../../data/dummy/redux';
import type { GenericAction } from '../editor/reducer';

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
  editorFormSectionsVisibility: {},
  ...dummyUiReduxState,
};

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
  [SET_EDITOR_FORM_SECTION_VISIBILITY]: handleSetEditorFormSectionVisibility,
};

export default function uiReducer(
  state: UIReduxState = initialUiReduxState,
  action: GenericAction
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}
