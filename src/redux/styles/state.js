// @flow
import type { ReduxState } from '../store';
import type { EditorFormInputModel } from '../../editor/components/EditorComponentForm/data/models';
import type { StyleValueWrapper } from '../../data/styles/state';
import {
  getStyleFromStyles,
  getStyleStateStyles,
  getStyleValueFromStyleWithMixins,
} from '../../data/styles/state';
import type { StylesModels } from '../../data/styles/model';
import { isValueDefined } from '../../utils/validation';
import type { MixinsModel } from '../../data/mixin/model';

export type StylesReduxState = {
  styles: StylesModels,
  mixins: MixinsModel,
};

export function getReduxStyles(state: ReduxState): StylesModels {
  return state.styles.styles;
}

export function getReduxMixins(state: ReduxState): MixinsModel {
  return state.styles.mixins;
}

export function getStylesFromStylesReduxState(state: StylesReduxState): StylesModels {
  return state.styles;
}

export function getReduxStyleStyleValue(
  state: ReduxState,
  input: EditorFormInputModel,
  stateKey: string,
  blockStyleKey: string
): StyleValueWrapper {
  const { key, reduxConnected, value } = input;
  if (!reduxConnected) {
    return {
      value,
      styleKey: blockStyleKey,
    };
  }
  const styles = getReduxStyles(state);
  const style = getStyleFromStyles(blockStyleKey, styles);
  if (!style) {
    return {
      value,
      styleKey: blockStyleKey,
    };
  }
  const mixins = getReduxMixins(state);
  const styleValue = getStyleValueFromStyleWithMixins(key, stateKey, style, mixins, styles);
  return styleValue;
}

export function getReduxStyleStyles(
  state: ReduxState,
  stateKey: string,
  blockStyleKey: string
): Array<{}> {
  const styles = getReduxStyles(state);
  const blockStyles = getStyleFromStyles(blockStyleKey, styles);
  if (!blockStyles) {
    return [];
  }
  const stateStyles = getStyleStateStyles(stateKey, blockStyles);
  return Object.keys(stateStyles).map((styleKey: string) => ({
    key: styleKey,
    value: stateStyles[styleKey].value,
  }));
}
