// @flow
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import styles from './styles';
import { SlimAddButton, SlimIconButton } from '../../../../../../components/Button/Button';
import { ReduxComponentSortable } from '../../../../../../components/ComponentSortable/ComponentSortable';
import { setAddingBlockRedux } from '../../../../../../../redux/ui/reducer';
import type { ReduxHistoryState, ReduxState } from '../../../../../../../redux/store';
import { getReduxUiAddingBlock } from '../../../../../../../redux/ui/state';
import AddBlockStateWrapper from './components/AddBlockStateWrapper/AddBlockStateWrapper';
import PreviousComponentLink from './components/PreviousComponentLink/PreviousComponentLink';
import { getReduxPresentState } from '../../../../../../../redux/styles/state';

type Props = {
  addingBlock: boolean,
  setAddingBlock: (addingBlock: boolean) => void,
};

const EditorSidebarModules = ({ addingBlock, setAddingBlock }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.optionsWrapperClass}>
      <div className={styles.previousComponentWrapperClass}>
        <PreviousComponentLink />
      </div>
      <div className={styles.addBlockWrapperClass}>
        {addingBlock ? (
          <SlimIconButton
            highlighted
            icon={<FaTimes size={9} />}
            onClick={() => setAddingBlock(false)}
          >
            Cancel
          </SlimIconButton>
        ) : (
          <SlimAddButton onClick={() => setAddingBlock(true)}>Add Block</SlimAddButton>
        )}
      </div>
    </div>
    <div className={styles.contentWrapperClass}>
      <ReduxComponentSortable addingBlock={addingBlock} />
    </div>
  </div>
);

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  return {
    addingBlock: getReduxUiAddingBlock(state),
  };
};

const mapDispatchToProps = {
  setAddingBlock: (addingBlock: boolean) => setAddingBlockRedux(addingBlock),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebarModules);
