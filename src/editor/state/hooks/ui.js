// @flow

import { useEditorState, useStylesState } from './shared';
import { getEditorReduxUnsavedChanges } from '../../../redux/editor/state';
import { getStylesReduxUnsavedChanges } from '../../../redux/styles/state';

export const useHasUnsavedChanges = (): boolean => {
  const editorState = useEditorState();
  const stylesState = useStylesState();
  return getEditorReduxUnsavedChanges(editorState) || getStylesReduxUnsavedChanges(stylesState);
};
