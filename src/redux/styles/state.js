// @flow
import type { ReduxState } from '../store';
import type { EditorFormInputModel } from '../../editor/components/EditorComponentForm/data/models';
import { getStyleFromStyles, getStyleValueFromStyle } from '../../data/styles/state';
import type { StylesModels } from '../../data/styles/model';

export function getReduxStyles(state: ReduxState): StylesModels {
  return state.styles;
}

export function getReduxStyleStyleValue(
  state: ReduxState,
  input: EditorFormInputModel,
  stateKey: string,
  blockStyleKey: string
): any {
  const { key, reduxConnected, value } = input;
  if (!reduxConnected) {
    return value;
  }
  const styles = getReduxStyles(state);
  const style = getStyleFromStyles(blockStyleKey, styles);
  if (!style) {
    return value;
  }
  return getStyleValueFromStyle(key, stateKey, style);
}
