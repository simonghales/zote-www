// @flow
import history from 'router/history';
import store from '../../redux/store';
import type { ReduxDataState } from '../../redux/store';
import { getPageComponentKey, getPageFromPages, getPageSlug } from '../../data/page/state';
import type { PageModel } from '../../data/page/model';
import { getPagesFromReduxState } from '../../redux/editor/state';
import { getComponentRoute } from './routing';
import { getPreviewSiteLinkPath } from '../../preview/routing/routing';
import { getReduxPresentState } from '../../redux/styles/state';
import { getReduxUIState } from '../../redux/shared/state';
import { getSiteKeyFromUIState } from '../../redux/ui/state';

export function getPageFromReduxState(state: ReduxDataState, pageKey: string): PageModel | null {
  const pages = getPagesFromReduxState(state);
  return getPageFromPages(pageKey, pages);
}

export function goToEditComponent(componentKey: string) {
  const rootState = store.getState();
  const uiState = getReduxUIState(rootState);
  const siteKey = getSiteKeyFromUIState(uiState);
  history.push(getComponentRoute(siteKey, componentKey));
}

export function goToEditPageComponent(pageKey: string) {
  const rootState = store.getState();
  const state = getReduxPresentState(rootState);
  const page = getPageFromReduxState(state, pageKey);
  if (!page) return;
  const componentKey = getPageComponentKey(page);
  goToEditComponent(componentKey);
}
export function openPagePreview(page: PageModel) {
  window.open(`${getPreviewSiteLinkPath(getPageSlug(page))}`, '_blank');
}
