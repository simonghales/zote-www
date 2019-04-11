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
  console.log('updateStyleStyleValue::stateKey', stateKey, value, style);
  if (!style) {
    style = generateEmptyStylesObject(styleKey);
  }
  let styleState = style.states[stateKey];
  if (!styleState) {
    styleState = {
      mixins: {},
      styles: {},
    };
  }
  return {
    ...style,
    states: {
      ...style.states,
      [stateKey]: {
        ...styleState,
        styles: updateStyleStateStyleValue(styleState.styles, styleValueKey, value),
      },
    },
  };
}
