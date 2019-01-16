// @flow

import type { BlockModel } from './model';

export function getStyleKeyFromBlock(block: BlockModel): string {
  if (block.styles) {
    return block.styles.stylesKey;
  }
  return '';
}
