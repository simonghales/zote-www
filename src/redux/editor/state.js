// @flow

import type { ReduxState } from '../store';
import type { ComponentsModels } from '../../data/component/model';
import type { EditorReduxState } from './reducer';
import type { BlockModel } from '../../data/block/model';
import { getBlockFromComponent, getComponentFromComponents } from '../../data/component/state';
import { getPropFromBlock } from '../../data/block/state';

export function getReduxEditorComponents(state: ReduxState): ComponentsModels {
  return state.editor.components;
}

export function getComponentsFromReduxEditorState(state: EditorReduxState): ComponentsModels {
  return state.components;
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
