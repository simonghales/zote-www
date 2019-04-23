// @flow

import { useReduxState } from 'reactive-react-redux';
import type { StylesReduxState } from '../../../redux/styles/state';
import type { ReduxState } from '../../../redux/store';
import type { StylesModels } from '../../../data/styles/model';
import { getStylesFromStylesReduxState } from '../../../redux/styles/state';
import type { MixinsModel } from '../../../data/mixin/model';

export const useStylesState = (): StylesReduxState => {
  const state: ReduxState = useReduxState();
  return state.styles;
};

export const useStyles = (): StylesModels => {
  const state = useStylesState();
  return getStylesFromStylesReduxState(state);
};

export const useMixins = (): MixinsModel => {
  const state = useStylesState();
  return state.mixins;
};
