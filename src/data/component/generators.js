// @flow

import type { ComponentModel } from './model';
import { generateComponentKey } from '../block/keys';
import type { BlocksModel } from '../block/model';
import { generateComponentBlock } from '../block/types/groups/component/Component/generate';

export function generateNewComponent({
  blocks = {},
  rootBlockKey = '',
  isReusable = false,
}: {
  blocks?: BlocksModel,
  rootBlockKey?: string,
  isReusable?: boolean,
}): ComponentModel {
  return {
    key: generateComponentKey(),
    blocks,
    rootBlockKey,
    isReusable,
  };
}

export function generateNewComponentWithDefaultBlocks(): ComponentModel {
  const block = generateComponentBlock();
  return generateNewComponent({
    blocks: {
      [block.key]: block,
    },
    rootBlockKey: block.key,
    isReusable: true,
  });
}
