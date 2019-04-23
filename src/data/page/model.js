// @flow

export type PageModel = {
  key: string,
  name: string,
  slug: string,
  pageComponentKey: string,
};

export type PagesModel = {
  [string]: PageModel,
};
