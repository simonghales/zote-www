// @flow

import type { ComponentModel } from './model';
import { generateComponentKey } from '../block/keys';
import type { BlocksModel } from '../block/model';

export function generateNewComponent({
  blocks = {},
  rootBlockKey = '',
}: {
  blocks?: BlocksModel,
  rootBlockKey?: string,
}): ComponentModel {
  return {
    key: generateComponentKey(),
    blocks,
    rootBlockKey,
    isReusable: false,
  };
}
