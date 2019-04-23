// @flow

import { useReduxState } from 'reactive-react-redux';
import type { EditorReduxState } from '../../../redux/editor/reducer';
import type { ReduxState } from '../../../redux/store';
import type { ComponentModel, ComponentsModels } from '../../../data/component/model';
import { getComponentsFromReduxEditorState } from '../../../redux/editor/state';
import { getComponentFromComponents } from '../../../data/component/state';

export const useEditorState = (): EditorReduxState => {
  const state: ReduxState = useReduxState();
  return state.editor;
};

export const useComponents = (): ComponentsModels => {
  const state: EditorReduxState = useEditorState();
  return getComponentsFromReduxEditorState(state);
};

export const useComponent = (componentKey: string): ComponentModel | null => {
  const components = useComponents();
  return getComponentFromComponents(componentKey, components);
};
