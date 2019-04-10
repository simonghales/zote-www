// @flow

import type { BlockModel } from '../model';
import type { BlockTypeModel } from './model';
import { BLOCK_TYPES } from './data';

export function generateBlockTypeBlock(
  blockTypeKey: string,
  generateProps: {
    [string]: any,
  }
): BlockModel {
  const blockType: BlockTypeModel = BLOCK_TYPES[blockTypeKey];
  if (!blockType) {
    throw new Error(`Couldn't find ${blockTypeKey} in Block Types.`);
  }
  return blockType.generate(generateProps);
}
