// @flow

import type { ReduxState } from '../../../../../redux/store';
import type { StyleModel, StylesModels } from '../../../../../data/styles/model';
import { getReduxMixins, getStylesFromStylesReduxState } from '../../../../../redux/styles/state';
import {
  getStyleFromStyles,
  getStyleStateMixins,
  getStyleStatesFromStyle,
} from '../../../../../data/styles/state';
import type { MixinsModel } from '../../../../../data/mixin/model';
import {
  getCombinedStateKey,
  getMappedStateKey,
} from '../../../../../preview/data/block/styles/state';
import { getMixinFromMixins, getMixinStylesKey } from '../../../../../data/mixin/state';

export function getStyleFromRedux(styleKey: string, state: ReduxState): StyleModel | null {
  const styles = getStylesFromStylesReduxState(state.styles);
  return getStyleFromStyles(styleKey, styles);
}

export type StateSelector = {
  label: string,
  key: string,
  removable: boolean,
};

type RawStateSelectors = {
  [string]: {
    removable: boolean,
  },
};

function mapSelectors(selectors: RawStateSelectors): Array<StateSelector> {
  return Object.keys(selectors).map(stateKey => {
    const isDefault = stateKey === '';
    return {
      label: isDefault ? 'Default' : stateKey,
      key: isDefault ? 'default' : stateKey,
      removable: isDefault ? false : selectors[stateKey].removable,
    };
  });
}

export function getMergedMappedStateKey(stateKey: string, parentStateKey: string): string {
  return getCombinedStateKey(parentStateKey, getMappedStateKey(stateKey));
}

export function getMixinStyle(
  mixinKey: string,
  mixins: MixinsModel,
  styles: StylesModels
): StyleModel | null {
  const mixin = getMixinFromMixins(mixins, mixinKey);
  const mixinStyleKey = getMixinStylesKey(mixin);
  return getStyleFromStyles(mixinStyleKey, styles);
}

function getStyleStateSelectors(
  style: StyleModel,
  styles: StylesModels,
  mixins: MixinsModel,
  parentStateKey: string,
  root: boolean,
  recursiveEnabled: boolean
): RawStateSelectors {
  let styleStateSelectors = {};
  const styleStates = getStyleStatesFromStyle(style);
  Object.keys(styleStates).forEach(stateKey => {
    const mergedMappedStateKey = getMergedMappedStateKey(stateKey, parentStateKey);
    styleStateSelectors[mergedMappedStateKey] = {
      key: mergedMappedStateKey,
      removable: root,
    };
    if (recursiveEnabled) {
      const stateMixins = getStyleStateMixins(stateKey, style);
      Object.keys(stateMixins).forEach(mixinKey => {
        const mixinStyle = getMixinStyle(mixinKey, mixins, styles);
        if (mixinStyle) {
          styleStateSelectors = {
            ...styleStateSelectors,
            ...getStyleStateSelectors(
              mixinStyle,
              styles,
              mixins,
              mergedMappedStateKey,
              false,
              recursiveEnabled
            ),
          };
        }
      });
    }
  });
  return styleStateSelectors;
}

export function getStylesFromRedux(state: ReduxState): StylesModels {
  return getStylesFromStylesReduxState(state.styles);
}

export function getStateSelectorsFromRedux(
  state: ReduxState,
  styleKey: string
): Array<StateSelector> {
  const selectors = {
    '': {
      removable: false,
    },
  };
  const style = getStyleFromRedux(styleKey, state);
  if (!style) {
    return mapSelectors(selectors);
  }
  const styles = getStylesFromRedux(state);
  const mixins = getReduxMixins(state);
  const styleStateSelectors = getStyleStateSelectors(style, styles, mixins, '', true, false);
  return mapSelectors(styleStateSelectors);
}
