// @flow

import ContainerBlock from './groups/basic/Container';
import ComponentBlock from './groups/component/Component';
import ComponentImportBlock from './groups/component/ComponentImport';
import HeadingBlock from './groups/basic/Heading';
import TextBlock from './groups/basic/Text';
import HtmlElementBlock from './groups/html/Element';

export const BLOCK_TYPES = {
  [ContainerBlock.key]: ContainerBlock,
  [HeadingBlock.key]: HeadingBlock,
  [TextBlock.key]: TextBlock,
  [HtmlElementBlock.key]: HtmlElementBlock,
  [ComponentBlock.key]: ComponentBlock,
  [ComponentImportBlock.key]: ComponentImportBlock,
};
