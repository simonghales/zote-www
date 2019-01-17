// @flow

import type { StateStylesModel, StyleModel, StylesModels } from './model';

export function getStyleFromStyles(styleKey: string, styles: StylesModels): StyleModel {
  return styles[styleKey];
}

export function getStyleStateStyles(stateKey: string, style: StyleModel): StateStylesModel {
  const state = style.states[stateKey];
  const { styles = {} } = state;
  return styles;
}

export function getStyleValueFromStyle(
  styleValueKey: string,
  stateKey: string,
  style: StyleModel
): any {
  const stateStyles = getStyleStateStyles(stateKey, style);
  const styleValue = stateStyles[styleValueKey];
  if (!styleValue) {
    return '';
  }
  const { value = '' } = styleValue;
  return value;
}
