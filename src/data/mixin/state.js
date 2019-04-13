// @flow

import type { MixinModel, MixinsModel } from './model';
import type { StyleModel, StylesModels } from '../styles/model';
import { getStyleFromStyles } from '../styles/state';

export function getMixinFromMixins(mixins: MixinsModel, mixinKey: string): MixinModel {
  const mixin = mixins[mixinKey];
  if (!mixin) {
    throw new Error(`Mixin ${mixinKey} not found in mixins`);
  }
  return mixin;
}

export function getMixinStylesKey(mixin: MixinModel): string {
  return mixin.stylesKey;
}

export function getStyleFromMixin(mixin: MixinModel, styles: StylesModels): StyleModel | null {
  return getStyleFromStyles(getMixinStylesKey(mixin), styles);
}
