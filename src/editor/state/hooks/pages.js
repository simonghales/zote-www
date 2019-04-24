// @flow

import { useReduxDispatch, useReduxState } from 'reactive-react-redux';
import { getPagesFromReduxState } from '../../../redux/editor/state';
import type { PageModel, PagesModel } from '../../../data/page/model';
import type { UIReduxState } from '../../../redux/ui/reducer';
import type { ReduxState } from '../../../redux/store';
import { getSelectedPageKeyFromUIReduxState } from '../../../redux/ui/state';
import type { MappedBlockModel } from '../../../preview/data/block/model';
import { getPageComponentKey, getPageFromPages } from '../../../data/page/state';
import { useComponent, useComponents } from './components';
import { useMixins, useStyles } from './styles';
import { mapComponentBlocksToMappedBlocks } from '../../../preview/data/block/state';
import { addNewPageRedux, updatePageDetailsRedux } from '../../../redux/editor/reducer';
import { generateNewPageAndComponent } from '../../../data/page/generators';
import { setSelectedPageKeyRedux } from '../../../redux/ui/reducer';

export const useUIState = (): UIReduxState => {
  const state: ReduxState = useReduxState();
  return state.ui;
};

export const usePages = (): PagesModel => {
  const state: ReduxState = useReduxState();
  return getPagesFromReduxState(state);
};

export const useSelectedPageKey = (): string => {
  const state: UIReduxState = useUIState();
  const selectedPageKey = getSelectedPageKeyFromUIReduxState(state);
  return selectedPageKey;
};

export const useSelectedPage = (): PageModel | null => {
  const selectedPageKey = useSelectedPageKey();
  const pages = usePages();
  return getPageFromPages(selectedPageKey, pages);
};

export const useSelectedPageMappedBlocks = (): Array<MappedBlockModel> => {
  const selectedPage = useSelectedPage();
  if (!selectedPage) return [];
  const selectedPageComponentKey = getPageComponentKey(selectedPage);
  const selectedPageComponent = useComponent(selectedPageComponentKey);
  if (!selectedPageComponent) return [];
  const components = useComponents();
  const styles = useStyles();
  const mixins = useMixins();
  return mapComponentBlocksToMappedBlocks(selectedPageComponent, styles, mixins, {}, components);
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
