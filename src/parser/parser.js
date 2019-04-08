// @flow
import React from 'react';
import type { Node } from 'react';
import type {
  MappedBlockModel,
  MappedBlockPropModel,
  MappedBlockStylesModel,
} from '../preview/data/block/model';
import {
  getComponentFromMappedBlock,
  getMappedStylesFromMappedBlock,
} from '../preview/data/block/state';
import { BLOCK_PROPS_CONFIG_TYPES } from '../data/block/props/model';
import RepeaterBlock from '../data/block/types/groups/functional/Repeater';

export function parseMappedBlockProp(
  prop: MappedBlockPropModel,
  mappedBlock: MappedBlockModel
): any {
  switch (prop.type) {
    case BLOCK_PROPS_CONFIG_TYPES.blocks:
    case BLOCK_PROPS_CONFIG_TYPES.componentReference:
      if (prop.value) {
        if (mappedBlock.blockTypeKey === RepeaterBlock.key) {
          // eslint-disable-next-line
          return prop.value.map(parseMappedBlocks);
        }
        // eslint-disable-next-line
        return parseMappedBlocks(prop.value);
      }
      return [];
    default:
      return prop.value;
  }
}

export function parseMappedBlockProps(
  mappedBlock: MappedBlockModel
): {
  [string]: any,
} {
  const { props = {} } = mappedBlock;
  const parsedProps = {};
  Object.keys(props).forEach(propKey => {
    parsedProps[propKey] = parseMappedBlockProp(props[propKey], mappedBlock);
  });
  return parsedProps;
}

export function parseMappedStyles(
  mappedStyles: MappedBlockStylesModel
): {
  [string]: string,
} {
  const parsedStyles = {};
  Object.keys(mappedStyles).forEach(stateKey => {
    const state = mappedStyles[stateKey];
    Object.keys(state).forEach(styleKey => {
      // todo handle states...
      const style = state[styleKey];
      parsedStyles[styleKey] = style;
    });
  });
  return parsedStyles;
}

export function parseMappedBlock(mappedBlock: MappedBlockModel) {
  const props = parseMappedBlockProps(mappedBlock);
  const BlockComponent: any = getComponentFromMappedBlock(mappedBlock);
  const mappedStyles = getMappedStylesFromMappedBlock(mappedBlock);
  const parsedStyles = parseMappedStyles(mappedStyles);
  const blockKey = mappedBlock.key;
  return (
    <BlockComponent {...props} zoteBlockKey={blockKey} key={blockKey} zoteStyles={parsedStyles} />
  );
}

export function parseMappedBlocks(mappedBlocks: Array<MappedBlockModel>): Array<Node> {
  return mappedBlocks.map(parseMappedBlock);
}
