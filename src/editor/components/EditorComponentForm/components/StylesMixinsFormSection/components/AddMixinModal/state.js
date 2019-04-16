// @flow

import type { ReduxState } from '../../../../../../../redux/store';
import type { MixinModel } from '../../../../../../../data/mixin/model';
import { getReduxMixins } from '../../../../../../../redux/styles/state';

export function getMixinsFromRedux(state: ReduxState): Array<MixinModel> {
  const mixins = getReduxMixins(state);
  return Object.keys(mixins).map(mixinKey => mixins[mixinKey]);
}
