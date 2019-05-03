// @flow

export const PREVIEW_WRAPPER_PATH = '/:siteKey/__preview';

export const PREVIEW_ROUTE_PATH = `${PREVIEW_WRAPPER_PATH}/__blocks`;

export const PREVIEW_SITE_ROUTE_PATH = `${PREVIEW_WRAPPER_PATH}/__site`;

export function getPreviewSiteLinkPath(siteKey: string, path: string): string {
  path = path || '';
  return `${PREVIEW_SITE_ROUTE_PATH}/${path}`.replace(':siteKey', siteKey);
}

export function getPageSlugFromPreviewPathname(pathname: string): string {
  let slug = pathname.split('__preview/__site')[0];
  slug = slug.replace(`${PREVIEW_SITE_ROUTE_PATH}`, '');
  if (slug.startsWith('/')) {
    slug = slug.slice(1);
  }
  return slug;
}
