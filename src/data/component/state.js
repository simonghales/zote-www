// @flow

import type { ComponentModel, ComponentsModels } from './model';
import type { BlockModel } from '../block/model';

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
