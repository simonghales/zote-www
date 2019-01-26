// @flow
import type { Node } from 'react';
import type { BlockTypeModel } from './model';
import type { BlockPropsConfigModel } from '../props/model';

export function getPropsConfigFromBlockType(blockType: BlockTypeModel): BlockPropsConfigModel {
  const { propsConfig = {} } = blockType;
  return propsConfig;
}

export function getIconFromBlockType(blockType: BlockTypeModel): Node {
  return blockType.icon ? blockType.icon : null;
}

export function getComponentFromBlockType(blockType: BlockTypeModel): Node {
  return blockType.component;
}

export function getPropsEnabledFromBlockType(blockType: BlockTypeModel): boolean {
  return blockType.propsEnabled;
}

export function getStylesEnabledFromBlockType(blockType: BlockTypeModel): boolean {
  return blockType.stylesEnabled;
}

export function getHtmlEnabledFromBlockType(blockType: BlockTypeModel): boolean {
  return blockType.htmlEnabled;
}

export function getAddPropsEnabledFromBlockType(blockType: BlockTypeModel): boolean {
  return blockType.addPropsEnabled;
}
