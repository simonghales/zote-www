// @flow
import { camelCase } from 'lodash';
import type { MappedBlockStylesModel } from '../model';
import type { StateStylesModel, StylesModels } from '../../../../data/styles/model';
import {
  getStyleFromStyles,
  getStyleStateMixins,
  getStyleStatesFromStyle,
  getStyleStateStyles,
  getValueFromRawStyle,
} from '../../../../data/styles/state';
import { STYLE_STATES } from '../../../../data/styles/model';
import type { MixinsModel } from '../../../../data/mixin/model';
import { getMixinFromMixins, getMixinStylesKey } from '../../../../data/mixin/state';

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

function getCombinedStateKey(parentKey: string, childKey: string): string {
  const seperator = childKey.startsWith('&') ? '' : '';
  return `${parentKey}${seperator}${childKey}`;
}

export function getMappedBlockStyles(
  styleKey: string,
  styles: StylesModels,
  mixins: MixinsModel
): MappedBlockStylesModel {
  const blockStyles = getStyleFromStyles(styleKey, styles);
  if (!blockStyles) return {};
  const mappedBlockStyles = {};
  const blockStylesStates = getStyleStatesFromStyle(blockStyles);
  Object.keys(blockStylesStates).forEach(stateKey => {
    const mappedStateKey = stateKey === STYLE_STATES.default ? '' : stateKey;
    const stateMixins = getStyleStateMixins(stateKey, blockStyles);
    mappedBlockStyles[mappedStateKey] = mappedBlockStyles[mappedStateKey]
      ? mappedBlockStyles[mappedStateKey]
      : {};
    Object.keys(stateMixins).forEach(mixinKey => {
      const mixin = getMixinFromMixins(mixins, mixinKey);
      const mixinStylesKey = getMixinStylesKey(mixin);
      const mixinMappedStyles = getMappedBlockStyles(mixinStylesKey, styles, mixins);
      Object.keys(mixinMappedStyles).forEach(mixinMappedStateKey => {
        const combinedStateKey = getCombinedStateKey(mappedStateKey, mixinMappedStateKey);
        const existingStyles = mappedBlockStyles[combinedStateKey]
          ? mappedBlockStyles[combinedStateKey]
          : {};
        mappedBlockStyles[combinedStateKey] = {
          ...existingStyles,
          ...mixinMappedStyles[mixinMappedStateKey],
        };
      });
    });

    const stateStyles = getStyleStateStyles(stateKey, blockStyles);
    const mappedStateStyles = mappedBlockStyles[mappedStateKey];
    mappedBlockStyles[mappedStateKey] = {
      ...mappedStateStyles,
      ...getMappedStateStyles(stateStyles),
    };
  });
  return mappedBlockStyles;
}
