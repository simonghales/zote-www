// @flow
import type { ReduxState } from '../store';
import type { AddBlockPositions } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { ADD_BLOCK_POSITIONS } from '../../editor/components/ComponentSortable/components/BlockItem/components/AddButton/AddButton';
import { getSelectedComponentSelector } from '../../editor/state/reselect/component';
import { isBlockInComponent } from '../../data/component/state';
import { getSelectedComponentSelectedBlockKey } from '../../editor/state/reselect/ui';
import { getComponentBlockFromReduxEditorState } from '../editor/state';
import { doesBlockAllowChildBlocks } from '../../data/block/state';
import {
  getReduxUiAddingBlockSelectedKey,
  getReduxUiAddingBlockSelectedPosition,
} from '../ui/state';

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
