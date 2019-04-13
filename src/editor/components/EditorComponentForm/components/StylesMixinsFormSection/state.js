// @flow

import type { ReduxState } from '../../../../../redux/store';
import { getStyleFromRedux } from '../StylesStateFormSection/state';
import type { StyleModel } from '../../../../../data/styles/model';
import type { MixinsModel } from '../../../../../data/mixin/model';
import { getReduxMixins } from '../../../../../redux/styles/state';
import { getMixinsFromStyleState, getStyleStatesFromStyle } from '../../../../../data/styles/state';
import { getMixinFromMixins } from '../../../../../data/mixin/state';

export type StyleMixinTag = {
  key: string,
  label: string,
  states: Array<string>,
};

export function getStyleMixinsTags(style: StyleModel, mixins: MixinsModel): Array<StyleMixinTag> {
  const styleMixins = {};
  const styleStates = getStyleStatesFromStyle(style);
  Object.keys(styleStates).forEach(stateKey => {
    const state = styleStates[stateKey];
    const stateMixins = getMixinsFromStyleState(state);
    Object.keys(stateMixins).forEach(mixinKey => {
      if (styleMixins[mixinKey]) {
        styleMixins[mixinKey] = {
          ...styleMixins[mixinKey],
          [stateKey]: true,
        };
      } else {
        styleMixins[mixinKey] = {
          [stateKey]: true,
        };
      }
    });
  });
  return Object.keys(styleMixins).map(mixinKey => {
    const styleMixin = styleMixins[mixinKey];
    const mixin = getMixinFromMixins(mixins, mixinKey);
    return {
      key: mixin.key,
      label: mixin.name,
      states: Object.keys(styleMixin),
    };
  });
}
export function getStyleMixinsFromRedux(state: ReduxState, styleKey: string): Array<StyleMixinTag> {
  const style = getStyleFromRedux(styleKey, state);
  if (!style) return [];
  const mixins = getReduxMixins(state);
  return getStyleMixinsTags(style, mixins);
}
