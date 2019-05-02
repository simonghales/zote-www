// @flow

import store from 'redux/store';
import type { FirestoreSiteDataModel } from '../../firebase/site/models';
import {
  getComponentsFromSiteHistoryData,
  getCurrentSiteHistoryData,
  getMixinsFromSiteHistoryData,
  getPagesFromSiteHistoryData,
  getStylesFromSiteHistoryData,
} from '../../firebase/site/models';
import type { EditorReduxState } from '../editor/reducer';
import { initialEditorReduxState, setEditorStateRedux } from '../editor/reducer';
import type { StylesReduxState } from '../styles/state';
import { initialStylesReduxState, setStylesStateRedux } from '../styles/reducer';
import { setLoadedSiteKeyRedux } from '../firebase/reducer';

export function getReduxEditorStateFromFirestoreSiteData(
  siteData: FirestoreSiteDataModel
): EditorReduxState {
  const currentData = getCurrentSiteHistoryData(siteData);
  if (!currentData) return initialEditorReduxState;
  return {
    components: getComponentsFromSiteHistoryData(currentData),
    pages: getPagesFromSiteHistoryData(currentData),
    unsavedChanges: false,
  };
}

export function getReduxStylesStateFromFirestoreSiteData(
  siteData: FirestoreSiteDataModel
): StylesReduxState {
  const currentData = getCurrentSiteHistoryData(siteData);
  if (!currentData) return initialStylesReduxState;
  return {
    styles: getStylesFromSiteHistoryData(currentData),
    mixins: getMixinsFromSiteHistoryData(currentData),
    unsavedChanges: false,
  };
}

export function initialiseReduxStateFromFirestoreSiteData(
  siteKey: string,
  siteData: FirestoreSiteDataModel
) {
  const { dispatch } = store;
  const editorState = getReduxEditorStateFromFirestoreSiteData(siteData);
  const stylesState = getReduxStylesStateFromFirestoreSiteData(siteData);
  // potentially clear history
  dispatch(setEditorStateRedux(editorState));
  dispatch(setStylesStateRedux(stylesState));
  dispatch(setLoadedSiteKeyRedux(siteKey));
}
