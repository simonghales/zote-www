// @flow
import type { ReduxState } from '../store';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import {
  getSelectedComponentKeySelector,
  getSelectedComponentSelector,
} from '../../editor/state/reselect/component';
import { getComponentParentComponents, isBlockInComponent } from '../../data/component/state';
import { getSelectedComponentSelectedBlockKey } from '../../editor/state/reselect/ui';
import {
  getComponentBlockFromReduxEditorState,
  getComponentFromReduxEditorState,
  getComponentsFromReduxEditorState,
} from '../editor/state';
import { doesBlockAllowChildBlocks } from '../../data/block/state';
import {
  getReduxUiAddingBlockSelectedKey,
  getReduxUiAddingBlockSelectedPosition,
  getReduxPreviousComponentKey,
} from '../ui/state';
import type { ComponentModel } from '../../data/component/model';

export function getReduxSafeAddingBlockSelectedKeyAndPosition(
  state: ReduxState
): [string, AddBlockPositions] {
  const component = getSelectedComponentSelector(state);
  let blockKey = getReduxUiAddingBlockSelectedKey(state);
  let position = getReduxUiAddingBlockSelectedPosition(state);
  if (!isBlockInComponent(component, blockKey)) {
    blockKey = getSelectedComponentSelectedBlockKey(state);
    const block = getComponentBlockFromReduxEditorState(state.editor, component.key, blockKey);
    if (!doesBlockAllowChildBlocks(block)) {
      position = ADD_BLOCK_POSITIONS.before;
    } else {
      position = ADD_BLOCK_POSITIONS.inside;
    }
  }
  return [blockKey, position];
}

export function getReduxPreviousComponent(state: ReduxState): ComponentModel | null {
  const previousComponentKey = getReduxPreviousComponentKey(state);
  if (previousComponentKey) {
    return getComponentFromReduxEditorState(state.editor, previousComponentKey);
  }
  return null;
}

export function getReduxParentComponent(state: ReduxState): ComponentModel | null {
  const currentComponentKey = getSelectedComponentKeySelector(state);
  const components = getComponentsFromReduxEditorState(state.editor);
  const parentComponents = getComponentParentComponents(components, currentComponentKey);
  if (parentComponents.length > 0) {
    const previousComponentKey = getReduxPreviousComponentKey(state);
    const previousParentComponent = parentComponents.find(
      component => component.key === previousComponentKey
    );
    if (previousParentComponent) {
      return previousParentComponent;
    }
    return parentComponents[0];
  }
  return null;
}
