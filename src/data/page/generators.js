// @flow

import type { PageModel } from './model';
import { generatePageKey } from '../block/keys';
import type { ComponentModel } from '../component/model';
import { generateNewComponent } from '../component/generators';
import { generatePageComponentBlock } from '../block/types/groups/component/PageComponent/generate';

export function generateNewPage({
  pageComponentKey = '',
}: {
  pageComponentKey: string,
}): PageModel {
  return {
    key: generatePageKey(),
    name: 'New Page',
    slug: '_newPage',
    pageComponentKey,
  };
}

export function generateNewPageAndComponent(): {
  page: PageModel,
  component: ComponentModel,
} {
  const block = generatePageComponentBlock();
  const component = generateNewComponent({
    blocks: {
      [block.key]: block,
    },
    rootBlockKey: block.key,
  });
  const page = generateNewPage({
    pageComponentKey: component.key,
  });
  return {
    page,
    component,
  };
}
