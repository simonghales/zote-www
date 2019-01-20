// @flow

import type { StateStylesModel, StyleModel } from './model';
import { generateEmptyStylesObject } from './generators';

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
  styleKey: string,
  stateKey: string,
  styleValueKey: string,
  value: any
): StyleModel {
  if (!style) {
    style = generateEmptyStylesObject(styleKey);
  }
  let styleState = style.states[stateKey];
  if (!styleState) {
    styleState = {
      styles: {},
    };
  }
  return {
    ...style,
    states: {
      ...style.states,
      [stateKey]: {
        styles: updateStyleStateStyleValue(styleState.styles, styleValueKey, value),
      },
    },
  };
}
