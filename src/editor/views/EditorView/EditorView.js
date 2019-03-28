// @flow
import React from 'react';
import 'styles/global';
import { connect } from 'react-redux';
import styles from './styles';
import EditorSidebar from './components/EditorSidebar/EditorSidebar';
import ModuleView from './views/ModuleView/ModuleView';
import AddBlockView from '../AddBlockView/AddBlockView';
import type { ReduxState } from '../../../redux/store';
import { getReduxUiAddingBlock } from '../../../redux/ui/state';

type Props = {
  addingBlock: boolean,
};

const EditorView = ({ addingBlock }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.sidebarClass}>
      <EditorSidebar />
    </div>
    <div className={styles.mainClass}>
      <ModuleView />
      {addingBlock && <AddBlockView />}
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getReduxUiAddingBlock(state),
});

export default connect(mapStateToProps)(EditorView);
