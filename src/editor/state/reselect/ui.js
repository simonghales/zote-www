// @flow

import { createSelector } from 'reselect';
import { getSelectedComponentSelector } from './component';
import type { ComponentModel } from '../../../data/component/model';
import { getKeyFromComponent, getRootBlockKeyFromComponent } from '../../../data/component/state';
import {
  getComponentSelectedBlockKey,
  getReduxUiComponentsSelectedBlockKeys,
} from '../../../redux/ui/state';
import type { ComponentsSelectedBlockKeys } from '../../../redux/ui/reducer';

export const getSelectedComponentSelectedBlockKey = createSelector(
  [getSelectedComponentSelector, getReduxUiComponentsSelectedBlockKeys],
  (component: ComponentModel | null, componentsSelectedBlockKeys: ComponentsSelectedBlockKeys) => {
    if (!component) {
      throw new Error(`No selected component.`);
    }
    const componentKey = getKeyFromComponent(component);
    const selectedBlockKey = getComponentSelectedBlockKey(
      componentKey,
      componentsSelectedBlockKeys
    );
    if (selectedBlockKey) {
      return selectedBlockKey;
    }
    return getRootBlockKeyFromComponent(component);
  }
);
