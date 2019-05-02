// @flow

import type { ReduxDataState, ReduxRootState } from '../store';
import type { ComponentModel, ComponentsModels } from '../../data/component/model';
import type { EditorReduxState } from './reducer';
import type { BlockModel } from '../../data/block/model';
import {
  getBlockFromComponent,
  getBlocksFromComponent,
  getComponentFromComponents,
  getRootBlockKeyFromComponent,
} from '../../data/component/state';
import type { BlockAvailablePropsModel } from '../../data/block/state';
import {
  getBlockParentBlockKeyFromBlocks,
  getMergedPropConfigFromBlock,
  getPropFromBlock,
  getRecursiveBlockPropAvailableProps,
  getTargetBlockAncestorsKeys,
} from '../../data/block/state';
import { isValueDefined } from '../../utils/validation';
import type { BlockPropModel } from '../../data/block/props/model';
import type { PageModel, PagesModel } from '../../data/page/model';
import { getPageFromPagesBySlug } from '../../data/page/state';
import { getReduxEditorState } from '../shared/state';

export function getReduxEditorComponents(state: ReduxRootState): ComponentsModels {
  const editorState = getReduxEditorState(state);
  return editorState.components;
}

export function getComponentsFromReduxEditorState(state: EditorReduxState): ComponentsModels {
  return state.components;
}

export function getComponentFromReduxEditorState(
  state: EditorReduxState,
  componentKey: string
): ComponentModel {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  if (!component) {
    throw new Error(`Couldn't find component "${componentKey}".`);
  }
  return component;
}

export function getComponentBlockFromReduxEditorState(
  state: EditorReduxState,
  componentKey: string,
  blockKey: string
): BlockModel {
  const components = getComponentsFromReduxEditorState(state);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  if (!block) {
    throw new Error(`Couldn't find block "${blockKey}" in component "${componentKey}"`);
  }
  return block;
}

export function getReduxComponentBlockPropValue(
  state: EditorReduxState,
  componentKey: string,
  blockKey: string,
  propKey: string
): any {
  const block = getComponentBlockFromReduxEditorState(state, componentKey, blockKey);
  const prop = getPropFromBlock(propKey, block);
  if (!prop) return null;
  return prop.value;
}

export function getReduxComponentBlockProp(
  state: EditorReduxState,
  componentKey: string,
  blockKey: string,
  propKey: string
): BlockPropModel | null {
  const block = getComponentBlockFromReduxEditorState(state, componentKey, blockKey);
  const prop = getPropFromBlock(propKey, block);
  if (!prop) return null;
  return prop;
}

export function getReduxComponentBlockPropDefaultValue(
  state: EditorReduxState,
  componentKey: string,
  blockKey: string,
  propKey: string
): any {
  const block = getComponentBlockFromReduxEditorState(state, componentKey, blockKey);
  const propConfig = getMergedPropConfigFromBlock(propKey, block);
  if (!propConfig || !isValueDefined(propConfig.defaultValue)) return null;
  return propConfig.defaultValue;
}

export function getBlockPropAvailableProps(
  componentKey: string,
  blockKey: string,
  state: EditorReduxState
): Array<BlockAvailablePropsModel> {
  const component = getComponentFromReduxEditorState(state, componentKey);
  const blocks = getBlocksFromComponent(component);
  const rootBlockKey = getRootBlockKeyFromComponent(component);
  const parentBlockKey = getBlockParentBlockKeyFromBlocks(blockKey, blocks);
  if (!parentBlockKey) return [];
  const ancestorBlockKeys = getTargetBlockAncestorsKeys(rootBlockKey, blockKey, blocks);
  return getRecursiveBlockPropAvailableProps(rootBlockKey, blockKey, blocks, ancestorBlockKeys, {});
}

export function getPagesFromEditorReduxState(state: EditorReduxState): PagesModel {
  return state.pages;
}

export function getPagesFromReduxState(state: ReduxDataState): PagesModel {
  return getPagesFromEditorReduxState(state.editor);
}

export function getPageBySlugFromReduxState(slug: string, state: ReduxDataState): PageModel | null {
  const pages = getPagesFromReduxState(state);
  return getPageFromPagesBySlug(slug, pages);
}

export function getEditorReduxUnsavedChanges(state: EditorReduxState): boolean {
  return state.unsavedChanges;
}
