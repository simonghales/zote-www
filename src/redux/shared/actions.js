// @flow

import store from 'redux/store';
import type { FirestoreSiteDataModel } from '../../firebase/models/site';
import type { EditorReduxState } from '../editor/reducer';
import type { StylesReduxState } from '../styles/state';
import { setEditorStateRedux } from '../editor/reducer';
import { setStylesStateRedux } from '../styles/reducer';
import { setLoadedSiteKeyRedux } from '../firebase/reducer';

export function getReduxEditorStateFromFirestoreSiteData(
  siteData: FirestoreSiteDataModel
): EditorReduxState {
  return {
    components: {},
    pages: {},
    unsavedChanges: false,
  };
}

export function getReduxStylesStateFromFirestoreSiteData(
  siteData: FirestoreSiteDataModel
): StylesReduxState {
  return {
    styles: {},
    mixins: {},
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
