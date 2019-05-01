// @flow

export const EDITOR_ROUTE_PARAMS = {
  componentKey: 'componentKey',
  previousComponentKey: 'previousComponentKey',
};

export type EditorRoutingMatch = {
  params: {
    siteKey: string,
    componentKey?: string,
    previousComponentKey?: string,
  },
};

export function getEditorRoutingMatchParam(
  paramName: string,
  match: EditorRoutingMatch
): string | typeof undefined {
  return match.params[paramName];
}

export const EDITOR_ROUTE_PATH = '/:siteKey/editor';

export const EDITOR_PATHS = {
  dashboard: `${EDITOR_ROUTE_PATH}`,
  pages: `${EDITOR_ROUTE_PATH}/pages`,
  pagesWithSlug: `${EDITOR_ROUTE_PATH}/pages/:pageSlug?`,
  page: `${EDITOR_ROUTE_PATH}/pages/:pageSlug`,
  components: `${EDITOR_ROUTE_PATH}/blocks`,
  component: `${EDITOR_ROUTE_PATH}/blocks/:${EDITOR_ROUTE_PARAMS.componentKey}/:${
    EDITOR_ROUTE_PARAMS.previousComponentKey
  }?`,
  mixins: `${EDITOR_ROUTE_PATH}/mixins`,
  data: `${EDITOR_ROUTE_PATH}/data`,
  media: `${EDITOR_ROUTE_PATH}/media`,
};

export function getEditorPath(path: string, { siteKey }: { siteKey: string }): string {
  return path.replace(':siteKey', siteKey);
}

export function getComponentRoute(
  siteKey: string,
  componentKey: string,
  previousComponentKey?: string
): string {
  let url = `/${siteKey}/editor/blocks/${componentKey}`;
  if (previousComponentKey) {
    url = `${url}/${previousComponentKey}`;
  }
  return url;
}
