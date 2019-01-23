// @flow
import { camelCase } from 'lodash';
import type { MappedBlockStylesModel } from '../model';
import type { StateStylesModel, StylesModels } from '../../../../data/styles/model';
import {
  getStyleFromStyles,
  getStyleStatesFromStyle,
  getStyleStateStyles,
  getValueFromRawStyle,
} from '../../../../data/styles/state';
import { STYLE_STATES } from '../../../../data/styles/model';

export function getMappedStateStyles(
  stateStyle: StateStylesModel
): {
  [string]: string,
} {
  const mappedStyles = {};
  Object.keys(stateStyle).forEach(styleKey => {
    const style = stateStyle[styleKey];
    mappedStyles[camelCase(styleKey)] = getValueFromRawStyle(style); // emotion wants camelCase CSS properties
  });
  return mappedStyles;
}

export function getMappedBlockStyles(
  styleKey: string,
  styles: StylesModels
): MappedBlockStylesModel {
  const blockStyles = getStyleFromStyles(styleKey, styles);
  if (!blockStyles) return {};
  const mappedBlockStyles = {};
  const blockStylesStates = getStyleStatesFromStyle(blockStyles);
  Object.keys(blockStylesStates).forEach(stateKey => {
    const mappedStateKey = stateKey === STYLE_STATES.default ? '' : stateKey; // todo - in the future...
    const stateStyles = getStyleStateStyles(stateKey, blockStyles);
    mappedBlockStyles[mappedStateKey] = getMappedStateStyles(stateStyles);
  });
  return mappedBlockStyles;
}
