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
