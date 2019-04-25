// @flow

export const PREVIEW_ROUTE_PATH = '/__preview';

export const PREVIEW_SITE_ROUTE_PATH = '/__previewSite';

export function getPreviewSiteLinkPath(path: string): string {
  path = path || '';
  return `${PREVIEW_SITE_ROUTE_PATH}/${path}`;
}
