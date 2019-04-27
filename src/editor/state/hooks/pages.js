// @flow

import { useReduxDispatch } from 'reactive-react-redux';
import { getPagesFromReduxState } from '../../../redux/editor/state';
import type { PageModel, PagesModel } from '../../../data/page/model';
import type { UIReduxState } from '../../../redux/ui/reducer';
import type { ReduxState } from '../../../redux/store';
import { getSelectedPageKeyFromUIReduxState } from '../../../redux/ui/state';
import type { MappedBlockModel } from '../../../preview/data/block/model';
import {
  getPageComponentKey,
  getPageFromPages,
  getPageFromPagesBySlug,
} from '../../../data/page/state';
import { useComponent, useComponents } from './components';
import { useMixins, useStyles } from './styles';
import { mapComponentBlocksToMappedBlocks } from '../../../preview/data/block/state';
import { addNewPageRedux, updatePageDetailsRedux } from '../../../redux/editor/reducer';
import { generateNewPageAndComponent } from '../../../data/page/generators';
import { setSelectedPageKeyRedux } from '../../../redux/ui/reducer';
import { useReduxPresentState } from './shared';

export const useUIState = (): UIReduxState => {
  const state: ReduxState = useReduxPresentState();
  return state.ui;
};

export const usePages = (): PagesModel => {
  const state: ReduxState = useReduxPresentState();
  return getPagesFromReduxState(state);
};

export const usePage = (pageKey: string): PageModel | null => {
  const pages = usePages();
  return getPageFromPages(pageKey, pages);
};

export const useSelectedPageKey = (): string => {
  const state: UIReduxState = useUIState();
  const selectedPageKey = getSelectedPageKeyFromUIReduxState(state);
  return selectedPageKey;
};

export const useSelectedPage = (): PageModel | null => {
  const selectedPageKey = useSelectedPageKey();
  return usePage(selectedPageKey);
};

export const useMappedPageBlocks = (pageKey: string): Array<MappedBlockModel> => {
  const page = usePage(pageKey);
  if (!page) return [];
  const selectedPageComponentKey = getPageComponentKey(page);
  const selectedPageComponent = useComponent(selectedPageComponentKey);
  if (!selectedPageComponent) return [];
  const components = useComponents();
  const styles = useStyles();
  const mixins = useMixins();
  return mapComponentBlocksToMappedBlocks(selectedPageComponent, styles, mixins, {}, components);
};

export const useSelectedPageMappedBlocks = (): Array<MappedBlockModel> => {
  const selectedPageKey = useSelectedPageKey();
  return useMappedPageBlocks(selectedPageKey);
};

export const useDispatchUpdatePageDetails = (): ((
  pageKey: string,
  name: string,
  slug: string
) => void) => {
  const dispatch = useReduxDispatch();
  return (pageKey: string, name: string, slug: string) =>
    dispatch(updatePageDetailsRedux(pageKey, name, slug));
};

export const useDispatchCreateNewPage = () => {
  const dispatch = useReduxDispatch();
  return () => {
    const { page, component } = generateNewPageAndComponent();
    dispatch(addNewPageRedux(page, component));
    dispatch(setSelectedPageKeyRedux(page.key));
  };
};

export const usePageBySlug = (slug: string): PageModel | null => {
  const pages = usePages();
  return getPageFromPagesBySlug(slug, pages);
};
