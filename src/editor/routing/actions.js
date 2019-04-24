// @flow
import history from 'router/history';
import store from '../../redux/store';
import type { ReduxState } from '../../redux/store';
import { getPageComponentKey, getPageFromPages } from '../../data/page/state';
import type { PageModel } from '../../data/page/model';
import { getPagesFromReduxState } from '../../redux/editor/state';
import { getComponentRoute } from './routing';

export function getPageFromReduxState(state: ReduxState, pageKey: string): PageModel | null {
  const pages = getPagesFromReduxState(state);
  return getPageFromPages(pageKey, pages);
}

export function goToEditPageComponent(pageKey: string) {
  const state: ReduxState = store.getState();
  const page = getPageFromReduxState(state, pageKey);
  if (!page) return;
  const componentKey = getPageComponentKey(page);
  history.push(getComponentRoute(componentKey));
}
