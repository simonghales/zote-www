// @flow

import type {
  RawStyleModel,
  StateStylesModel,
  StyleModel,
  StylesModels,
  StyleStateMixinsModel,
  StyleStateModel,
  StyleStatesModel,
} from './model';
import type { MixinsModel } from '../mixin/model';
import { getMixinFromMixins, getMixinStylesKey } from '../mixin/state';
import { getReduxMixins } from '../../redux/styles/state';
import { isValueDefined } from '../../utils/validation';

export type StyleValueWrapper = {
  value: any,
  styleKey: string,
};

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
  if (!state) {
    return {};
  }
  return getStylesFromStyleState(state);
}

export function getStyleValueFromStyle(
  styleValueKey: string,
  stateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): StyleValueWrapper {
  const stateStyles = getStyleStateStyles(stateKey, style);
  const styleValue = stateStyles[styleValueKey];
  if (!styleValue) {
    return getStyleValueFromMixins(styleValueKey, stateKey, style, mixins, styles);
  }
  const { value = '' } = styleValue;
  return {
    value,
    styleKey: style.key,
  };
}

export function getMixinsFromStyleState(styleState: StyleStateModel): StyleStateMixinsModel {
  const { mixins = {} } = styleState;
  return mixins;
}

export function getStyleStateMixins(stateKey: string, style: StyleModel): StyleStateMixinsModel {
  const states = getStyleStatesFromStyle(style);
  const state = states[stateKey];
  if (!state) {
    return {};
  }
  return getMixinsFromStyleState(state);
}

export function getStyleValueFromMixins(
  styleValueKey: string,
  stateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): StyleValueWrapper {
  const stateMixins = getStyleStateMixins(stateKey, style);
  const mixinsKeys = Object.keys(stateMixins);
  for (let i = 0, len = mixinsKeys.length; i < len; i++) {
    const mixinKey = mixinsKeys[i];
    const mixin = getMixinFromMixins(mixins, mixinKey);
    const mixinStylesKey = getMixinStylesKey(mixin);
    const mixinStyles = getStyleFromStyles(mixinStylesKey, styles);
    if (mixinStyles) {
      const mixinValue = getStyleValueFromStyle(
        styleValueKey,
        stateKey,
        mixinStyles,
        mixins,
        styles
      );
      if (isValueDefined(mixinValue)) {
        return {
          ...mixinValue,
          styleKey: mixinStylesKey,
        };
      }
    }
  }
  return {
    value: '',
    styleKey: '',
  };
}
