// @flow

import type { ComponentModel, ComponentsModels } from './model';
import type { BlockModel, BlocksModel } from '../block/model';
import { getBlockComponentImportKey, getBlockName } from '../block/state';

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

export function doesComponentImportComponent(
  component: ComponentModel,
  componentKey: string
): boolean {
  const blocks = getBlocksFromComponent(component);
  let importsComponent = false;
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    const componentImportKey = getBlockComponentImportKey(block);
    if (componentImportKey && componentImportKey === componentKey) {
      importsComponent = true;
    }
  });
  return importsComponent;
}

export function getComponentParentComponents(
  components: ComponentsModels,
  componentKeyToCheck: string
): Array<ComponentModel> {
  return Object.keys(components)
    .map(componentKey => components[componentKey])
    .filter(component => doesComponentImportComponent(component, componentKeyToCheck));
}

export function getComponentName(component: ComponentModel): string {
  const rootBlockKey = getRootBlockKeyFromComponent(component);
  const rootBlock = getBlockFromComponent(component, rootBlockKey);
  return getBlockName(rootBlock);
}
