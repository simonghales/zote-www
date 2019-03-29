// @flow

import type { ComponentModel, ComponentsModels } from './model';
import type { BlockModel, BlocksModel } from '../block/model';

export function getComponentFromComponents(
  componentKey: string,
  components: ComponentsModels
): ComponentModel {
  return components[componentKey];
}

export function getBlockFromComponent(component: ComponentModel, blockKey: string): BlockModel {
  return component.blocks[blockKey];
}

export function getRootBlockKeyFromComponent(component: ComponentModel): string {
  return component.rootBlockKey;
}

export function getBlocksFromComponent(component: ComponentModel): BlocksModel {
  const { blocks = {} } = component;
  return blocks;
}

export function getKeyFromComponent(component: ComponentModel): string {
  return component.key;
}

export function isBlockInComponent(component: ComponentModel, blockKey: string): boolean {
  const block = getBlockFromComponent(component, blockKey);
  return !!block;
}
