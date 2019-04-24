// @flow

import type { PageModel } from './model';

export function updatePageDetails(page: PageModel, name: string, slug: string): PageModel {
  return {
    ...page,
    name,
    slug,
  };
}
