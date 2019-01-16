// @flow

import { createSelector } from 'reselect';
import { getReduxEditorComponents } from '../../../redux/editor/state';
import type { ComponentModel, ComponentsModels } from '../../../data/component/model';
import { getReduxUiSelectedComponentKey } from '../../../redux/ui/state';
import { getComponentFromComponents } from '../../../data/component/state';

export const getSelectedComponentKeySelector = createSelector(
  [getReduxUiSelectedComponentKey],
  (selectedComponentKey: string) => selectedComponentKey
);

export const getSelectedComponentSelector = createSelector(
  [getReduxUiSelectedComponentKey, getReduxEditorComponents],
  (selectedComponentKey: string, components: ComponentsModels) => {
    if (!selectedComponentKey) {
      return null;
    }
    return getComponentFromComponents(selectedComponentKey, components);
  }
);
