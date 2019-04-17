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
import SelectedComponentContextWrapper from '../../components/SelectedComponentContextWrapper/SelectedComponentContextWrapper';
import type { EditorRoutingMatch } from '../../routing/routing';
import EditorRouteHandler from '../../routing/components/EditorRouteHandler';
import EditorContextWrapper from '../../context/components/EditorContextWrapper/EditorContextWrapper';
import EditorUIContextWrapper from '../../context/components/EditorUIContextWrapper/EditorUIContextWrapper';
import EditorNavBar from './components/EditorNavBar/EditorNavBar';

type Props = {
  addingBlock: boolean,
  history: any,
  match: EditorRoutingMatch,
};

class EditorView extends React.Component<Props> {
  render() {
    const { addingBlock } = this.props;
    return (
      <EditorRouteHandler>
        <EditorUIContextWrapper>
          <EditorContextWrapper>
            <SelectedComponentContextWrapper>
              <div className={styles.containerClass}>
                <div className={styles.navBarClass}>
                  <EditorNavBar />
                </div>
                <div className={styles.bodyClass}>
                  <div className={styles.sidebarClass}>
                    <EditorSidebar />
                  </div>
                  <div className={styles.mainClass}>
                    <ModuleView />
                    {addingBlock && <AddBlockView />}
                  </div>
                </div>
              </div>
            </SelectedComponentContextWrapper>
          </EditorContextWrapper>
        </EditorUIContextWrapper>
      </EditorRouteHandler>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  addingBlock: getReduxUiAddingBlock(state),
});

export default connect(mapStateToProps)(EditorView);
