// @flow

import { createSelector } from 'reselect';
import { getReduxEditorComponents } from '../../../redux/editor/state';
import type { ComponentsModels } from '../../../data/component/model';
import { getReduxSelectedComponentKey } from '../../../redux/ui/state';
import { getComponentFromComponents } from '../../../data/component/state';

export const getSelectedComponentKeySelector = createSelector(
  [getReduxSelectedComponentKey],
  (selectedComponentKey: string) => selectedComponentKey
);

export const getSelectedComponentSelector = createSelector(
  [getReduxSelectedComponentKey, getReduxEditorComponents],
  (selectedComponentKey: string, components: ComponentsModels) => {
    if (!selectedComponentKey) {
      return null;
    }
    return getComponentFromComponents(selectedComponentKey, components);
  }
);
