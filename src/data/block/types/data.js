// @flow

import ContainerBlock from './groups/basic/Container';
import ComponentBlock from './groups/component/Component';
import HeadingBlock from './groups/basic/Heading';

export const BLOCK_TYPES = {
  [ContainerBlock.key]: ContainerBlock,
  [ComponentBlock.key]: ComponentBlock,
  [HeadingBlock.key]: HeadingBlock,
};
