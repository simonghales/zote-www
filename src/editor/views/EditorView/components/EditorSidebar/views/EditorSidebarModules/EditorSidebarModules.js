// @flow
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import styles from './styles';
import { SlimIconButton } from '../../../../../../components/Button/Button';
import { ReduxComponentSortable } from '../../../../../../components/ComponentSortable/ComponentSortable';
import { setAddingBlockRedux } from '../../../../../../../redux/ui/reducer';
import type { ReduxState } from '../../../../../../../redux/store';
import { getReduxUiAddingBlock } from '../../../../../../../redux/ui/state';
import AddBlockStateWrapper from './components/AddBlockStateWrapper/AddBlockStateWrapper';

type Props = {
  addingBlock: boolean,
  setAddingBlock: (addingBlock: boolean) => void,
};

const EditorSidebarModules = ({ addingBlock, setAddingBlock }: Props) => (
  <div className={styles.containerClass}>
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
        <SlimIconButton icon={<FaPlus size={9} />} onClick={() => setAddingBlock(true)}>
          Add Block
        </SlimIconButton>
      )}
    </div>
    <div className={styles.contentWrapperClass}>
      <ReduxComponentSortable addingBlock={addingBlock} />
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getReduxUiAddingBlock(state),
});

const mapDispatchToProps = {
  setAddingBlock: (addingBlock: boolean) => setAddingBlockRedux(addingBlock),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorSidebarModules);
