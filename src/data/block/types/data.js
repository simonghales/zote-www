// @flow

import ContainerBlock from './groups/basic/Container';
import ComponentBlock from './groups/component/Component';
import ComponentImportBlock from './groups/component/ComponentImport';
import HeadingBlock from './groups/basic/Heading';
import TextBlock from './groups/basic/Text';
import HtmlElementBlock from './groups/html/Element';
import RepeaterBlock from './groups/functional/Repeater';
import PageComponentBlock from './groups/component/PageComponent';

export const BLOCK_TYPES = {
  [ContainerBlock.key]: ContainerBlock,
  [HeadingBlock.key]: HeadingBlock,
  [TextBlock.key]: TextBlock,
  [HtmlElementBlock.key]: HtmlElementBlock,
  [ComponentBlock.key]: ComponentBlock,
  [ComponentImportBlock.key]: ComponentImportBlock,
  [RepeaterBlock.key]: RepeaterBlock,
  [PageComponentBlock.key]: PageComponentBlock,
};
