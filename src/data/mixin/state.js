// @flow

import type { MixinModel, MixinsModel } from './model';

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
