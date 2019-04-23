// @flow

import type { PageModel, PagesModel } from './model';

export function getPageName(page: PageModel): string {
  return page.name;
}

export function getPageSlug(page: PageModel): string {
  return page.slug;
}

export function getPageFromPages(pageKey: string, pages: PagesModel): PageModel | null {
  const page = pages[pageKey];
  return page || null;
}

export function getPageComponentKey(page: PageModel): string {
  return page.pageComponentKey;
}
