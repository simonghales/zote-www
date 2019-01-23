// @flow

import ContainerBlock from './groups/basic/Container';
import ComponentBlock from './groups/component/Component';
import HeadingBlock from './groups/basic/Heading';
import TextBlock from './groups/basic/Text';

export const BLOCK_TYPES = {
  [ContainerBlock.key]: ContainerBlock,
  [HeadingBlock.key]: HeadingBlock,
  [TextBlock.key]: TextBlock,
  [ComponentBlock.key]: ComponentBlock,
};
