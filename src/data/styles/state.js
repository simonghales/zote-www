// @flow

import type {
  RawStyleModel,
  StateStylesModel,
  StyleModel,
  StylesModels,
  StyleStateModel,
  StyleStatesModel,
} from './model';

export function getValueFromRawStyle(style: RawStyleModel): string {
  return style.value;
}

export function getStyleFromStyles(styleKey: string, styles: StylesModels): StyleModel | null {
  return styles[styleKey];
}

export function getStylesFromStyleState(styleState: StyleStateModel): StateStylesModel {
  const { styles = {} } = styleState;
  return styles;
}

export function getStyleStatesFromStyle(style: StyleModel): StyleStatesModel {
  const { states = {} } = style;
  return states;
}

export function getStyleStateStyles(stateKey: string, style: StyleModel): StateStylesModel {
  const states = getStyleStatesFromStyle(style);
  const state = states[stateKey];
  return getStylesFromStyleState(state);
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
