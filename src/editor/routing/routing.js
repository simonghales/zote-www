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
  components: `${EDITOR_ROUTE_PATH}/components`,
  mixins: `${EDITOR_ROUTE_PATH}/mixins`,
};
