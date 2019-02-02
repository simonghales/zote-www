// @flow

import type { StateStylesModel, StyleModel } from './model';
import { generateEmptyStylesObject } from './generators';
import { isValueDefined } from '../../utils/validation';

export function updateStyleStateStyleValue(
  styles: StateStylesModel,
  styleValueKey: string,
  value?: any
): StateStylesModel {
  if (isValueDefined(value)) {
    return {
      ...styles,
      [styleValueKey]: {
        value,
      },
    };
  }
  const allowedStyles = {};
  Object.keys(styles)
    .filter(styleKey => styleKey !== styleValueKey)
    .forEach(styleKey => {
      allowedStyles[styleKey] = styles[styleKey];
    });
  return allowedStyles;
}

export function updateStyleStyleValue(
  style: StyleModel,
  styleKey: string,
  stateKey: string,
  styleValueKey: string,
  value?: any
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
