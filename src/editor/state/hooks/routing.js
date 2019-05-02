// @flow

import useReactRouter from 'use-react-router';
import { useReduxState } from 'reactive-react-redux';
import { getEditorPath } from '../../routing/routing';
import { getSiteKeyFromRootReduxState } from '../../../redux/ui/state';

export function useSiteKeyRedux(): string {
  const rootState = useReduxState();
  return getSiteKeyFromRootReduxState(rootState);
}

export function useGetEditorPath(path: string): string {
  const siteKey = useSiteKeyRedux();
  return getEditorPath(path, { siteKey });
}

export function useRouterSiteKeyParam(): string {
  const { match } = useReactRouter();
  return match.params.siteKey;
}
