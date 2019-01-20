// @flow

import type { StyleModel } from './model';

export function generateEmptyStylesObject(key: string): StyleModel {
  return {
    key,
    mixins: {},
    states: {},
  };
}
