// @flow

import type { StateStylesModel, StyleModel } from './model';

export function updateStyleStateStyleValue(
  styles: StateStylesModel,
  styleValueKey: string,
  value: any
): StateStylesModel {
  return {
    ...styles,
    [styleValueKey]: {
      value,
    },
  };
}

export function updateStyleStyleValue(
  style: StyleModel,
  stateKey: string,
  styleValueKey: string,
  value: any
): StyleModel {
  return {
    ...style,
    states: {
      ...style.states,
      [stateKey]: {
        styles: updateStyleStateStyleValue(style.states[stateKey].styles, styleValueKey, value),
      },
    },
  };
}
