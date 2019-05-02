// @flow

import type { ReduxRootState } from '../../redux/store';
import type { FirestoreSiteHistoryDataModel } from './models';
import { generateHistoryKey } from './actions';
import {
  getComponentsFromReduxEditorState,
  getPagesFromEditorReduxState,
} from '../../redux/editor/state';
import { getReduxEditorState, getReduxStylesState } from '../../redux/shared/state';
import {
  getMixinsFromStylesReduxState,
  getStylesFromStylesReduxState,
} from '../../redux/styles/state';

export function getCurrentReduxStateAsFirestoreSiteHistoryData(
  state: ReduxRootState
): FirestoreSiteHistoryDataModel {
  const historyKey = generateHistoryKey();
  const editorState = getReduxEditorState(state);
  const stylesState = getReduxStylesState(state);
  const components = getComponentsFromReduxEditorState(editorState);
  const pages = getPagesFromEditorReduxState(editorState);
  const styles = getStylesFromStylesReduxState(stylesState);
  const mixins = getMixinsFromStylesReduxState(stylesState);
  return {
    historyKey,
    components,
    pages,
    styles,
    mixins,
  };
}
