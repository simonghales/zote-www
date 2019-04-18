// @flow

export const EDITOR_ROUTE_PARAMS = {
  componentKey: 'componentKey',
  previousComponentKey: 'previousComponentKey',
};

export type EditorRoutingMatch = {
  params: {
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

export const EDITOR_ROUTE_PATH = '/editor';

export const EDITOR_PATHS = {
  dashboard: `${EDITOR_ROUTE_PATH}`,
  pages: `${EDITOR_ROUTE_PATH}/pages`,
  page: `${EDITOR_ROUTE_PATH}/pages/:pageSlug`,
  components: `${EDITOR_ROUTE_PATH}/components`,
  component: `${EDITOR_ROUTE_PATH}/components/:${EDITOR_ROUTE_PARAMS.componentKey}/:${
    EDITOR_ROUTE_PARAMS.previousComponentKey
  }?`,
  mixins: `${EDITOR_ROUTE_PATH}/mixins`,
  data: `${EDITOR_ROUTE_PATH}/data`,
};
