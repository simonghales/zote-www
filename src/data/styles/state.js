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
import type { MixinModel, MixinsModel } from '../mixin/model';
import { getMixinFromMixins, getMixinStylesKey, getStyleFromMixin } from '../mixin/state';
import { getReduxMixins } from '../../redux/styles/state';
import { isValueDefined } from '../../utils/validation';
import { STYLE_STATES } from './model';
import { getCombinedStateKey, getMappedStateKey } from '../../preview/data/block/styles/state';

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

export function getStyleStatesListFromStyle(style: StyleModel): Array<StyleStateModel> {
  const states = getStyleStatesFromStyle(style);
  return Object.keys(states).map(stateKey => states[stateKey]);
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
  style: StyleModel
): any {
  const stateStyles = getStyleStateStyles(stateKey, style);
  const styleValue = stateStyles[styleValueKey];
  if (!styleValue) return undefined;
  return styleValue.value;
}

export function getStyleValueFromStyleWithMixins(
  styleValueKey: string,
  stateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): StyleValueWrapper {
  const styleValue = getStyleValueFromStyle(styleValueKey, stateKey, style);
  if (!isValueDefined(styleValue)) {
    // eslint-disable-next-line no-use-before-define
    return getStyleValueFromMixins(styleValueKey, stateKey, style, mixins, styles);
  }
  return {
    value: styleValue,
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

export function getStyleStateMixinsAndDefaultStateMixins(
  stateKey: string,
  style: StyleModel
): StyleStateMixinsModel {
  const styleStateMixins = getStyleStateMixins(stateKey, style);
  let defaultStateMixins = {};
  if (stateKey !== STYLE_STATES.default) {
    defaultStateMixins = getStyleStateMixins(STYLE_STATES.default, style);
  }
  return {
    ...styleStateMixins,
    ...defaultStateMixins,
  };
}

export function getRecursiveStyleStates(
  matchStateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): {
  [string]: {
    [string]: boolean,
  },
} {
  const mappedMixins = {};
  let styleStateKeys = {};
  const states = getStyleStatesFromStyle(style);
  Object.keys(states).forEach(stateKey => {
    const mappedStateKey = getMappedStateKey(stateKey);
    const state = states[stateKey];
    styleStateKeys = {
      ...styleStateKeys,
      [mappedStateKey]: true,
    };
    const stateMixins = getMixinsFromStyleState(state);
    Object.keys(stateMixins).forEach(mixinKey => {
      const mixin = getMixinFromMixins(mixins, mixinKey);
      const mixinStyleKey = getMixinStylesKey(mixin);
      const mixinStyle = getStyleFromStyles(mixinStyleKey, styles);
      if (mixinStyle) {
        const mixinStyleStates = getRecursiveStyleStates(matchStateKey, mixinStyle, mixins, styles);
        Object.keys(mixinStyleStates).forEach(returnedStyleKey => {
          const updatedStates = {};
          Object.keys(mixinStyleStates[returnedStyleKey]).forEach(returnedStyleStateKey => {
            const combinedState = getCombinedStateKey(mappedStateKey, returnedStyleStateKey);
            updatedStates[combinedState] = true;
          });
          if (mappedMixins[returnedStyleKey]) {
            mappedMixins[returnedStyleKey] = {
              ...mappedMixins[returnedStyleKey],
              ...updatedStates,
            };
          } else {
            mappedMixins[returnedStyleKey] = updatedStates;
          }
        });
      }
    });
  });

  if (mappedMixins[style.key]) {
    mappedMixins[style.key] = {
      ...mappedMixins[style.key],
      ...styleStateKeys,
    };
  } else {
    mappedMixins[style.key] = styleStateKeys;
  }

  return mappedMixins;
}

export function getMatchedStylesWithStyleState(
  matchStateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): Array<string> {
  const mappedStateKey = getMappedStateKey(matchStateKey);
  const allStyleStates = getRecursiveStyleStates(matchStateKey, style, mixins, styles);
  return Object.keys(allStyleStates).filter(styleKey => {
    const styleToCheck = allStyleStates[styleKey];
    return Object.keys(styleToCheck).includes(mappedStateKey);
  });
}

function getMixinStyleValue(
  styleValueKey: string,
  stateKey: string,
  parentStateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): StyleValueWrapper | typeof undefined {
  const states = getStyleStatesFromStyle(style);
  const statesKeys = Object.keys(states);
  for (let i = 0, len = statesKeys.length; i < len; i++) {
    const styleStateKey = statesKeys[i];
    const mappedStateKey = getMappedStateKey(styleStateKey);
    const combinedStateKey = getCombinedStateKey(parentStateKey, mappedStateKey);
    if (combinedStateKey === stateKey) {
      const mixinValue = getStyleValueFromStyle(styleValueKey, styleStateKey, style);
      if (isValueDefined(mixinValue)) {
        return {
          value: mixinValue,
          styleKey: style.key,
        };
      }
    }
    const styleStateMixins = getMixinsFromStyleState(states[styleStateKey]);
    const styleStateMixinsKeys = Object.keys(styleStateMixins);
    for (let j = 0, jLen = styleStateMixinsKeys.length; j < jLen; j++) {
      const stateMixinKey = styleStateMixinsKeys[j];
      const stateMixin = getMixinFromMixins(mixins, stateMixinKey);
      const stateMixinStyle = getStyleFromMixin(stateMixin, styles);
      if (stateMixinStyle) {
        const stateMixinStyleValue = getMixinStyleValue(
          styleValueKey,
          stateKey,
          combinedStateKey,
          stateMixinStyle,
          mixins,
          styles
        );
        if (stateMixinStyleValue) {
          return stateMixinStyleValue;
        }
      }
    }
  }
  return undefined;
}

export function getStyleValueFromMixins(
  styleValueKey: string,
  stateKey: string,
  style: StyleModel,
  mixins: MixinsModel,
  styles: StylesModels
): StyleValueWrapper {
  const styleValue = getMixinStyleValue(styleValueKey, stateKey, '', style, mixins, styles);
  if (typeof styleValue !== 'undefined') {
    return styleValue;
  }
  return {
    value: '',
    styleKey: '',
  };
}
