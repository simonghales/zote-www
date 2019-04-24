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

export function getPageFromPagesBySlug(slug: string, pages: PagesModel): PageModel | null {
  const matchedPage = Object.keys(pages)
    .map(pageKey => pages[pageKey])
    .find(page => page.slug === slug);
  return matchedPage || null;
}

export function getPageComponentKey(page: PageModel): string {
  return page.pageComponentKey;
}
