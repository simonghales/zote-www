// @flow

import { useReduxDispatch } from 'reactive-react-redux';
import type { EditorReduxState } from '../../../redux/editor/reducer';
import type { ReduxState } from '../../../redux/store';
import type { ComponentModel, ComponentsModels } from '../../../data/component/model';
import { getComponentsFromReduxEditorState } from '../../../redux/editor/state';
import { getComponentFromComponents, getReusableComponents } from '../../../data/component/state';
import type { UIReduxState } from '../../../redux/ui/reducer';
import { useUIState } from './pages';
import { getSelectedPreviewComponentKeyFromUIReduxState } from '../../../redux/ui/state';
import {
  generateNewComponent,
  generateNewComponentWithDefaultBlocks,
} from '../../../data/component/generators';
import { setSelectedPreviewComponentKeyRedux } from '../../../redux/ui/reducer';
import { addNewComponentRedux } from '../../../redux/editor/reducer';
import { useReduxPresentState } from './shared';

export const useEditorState = (): EditorReduxState => {
  const state: ReduxState = useReduxPresentState();
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

export const useReusableComponents = (): Array<ComponentModel> => {
  const components = useComponents();
  return getReusableComponents(components);
};

export const useSelectedPreviewComponentKey = (): string => {
  const state: UIReduxState = useUIState();
  return getSelectedPreviewComponentKeyFromUIReduxState(state);
};

export const useSelectedPreviewComponent = (): ComponentModel | null => {
  const componentKey = useSelectedPreviewComponentKey();
  return useComponent(componentKey);
};

export const useDispatchCreateNewComponent = () => {
  const dispatch = useReduxDispatch();
  return () => {
    const component = generateNewComponentWithDefaultBlocks();
    dispatch(addNewComponentRedux(component));
    dispatch(setSelectedPreviewComponentKeyRedux(component.key));
  };
};
