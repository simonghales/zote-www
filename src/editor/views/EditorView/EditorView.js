// @flow
import React from 'react';
import 'styles/global';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { debounce, throttle } from 'lodash';
import store from 'redux/store';
import type { ReduxHistoryState } from 'redux/store';
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
import EditorComponentView from './views/EditorComponentView/EditorComponentView';
import { EDITOR_PATHS } from '../../routing/routing';
import PagesView from './views/PagesView/PagesView';
import ComponentsView from './views/ComponentsView/ComponentsView';
import { storeReduxStateInLocalStorage } from '../../../redux/storage';
import { getReduxPresentState } from '../../../redux/styles/state';

type Props = {
  addingBlock: boolean,
  history: any,
  match: EditorRoutingMatch,
};

class EditorView extends React.Component<Props> {
  unsubscribeToStore;

  constructor(props: Props) {
    super(props);
    this.unsubscribeToStore = store.subscribe(debounce(storeReduxStateInLocalStorage, 1000));
  }

  componentWillUnmount(): void {
    if (this.unsubscribeToStore) {
      this.unsubscribeToStore();
    }
  }

  render() {
    const { addingBlock } = this.props;
    return (
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
                  <Route exact path={EDITOR_PATHS.component} component={EditorComponentView} />
                  <Route exact path={EDITOR_PATHS.components} component={ComponentsView} />
                  <Route path={EDITOR_PATHS.pagesWithSlug} component={PagesView} />
                  {addingBlock && <AddBlockView />}
                </div>
              </div>
            </div>
          </SelectedComponentContextWrapper>
        </EditorContextWrapper>
      </EditorUIContextWrapper>
    );
  }
}

const mapStateToProps = (historyState: ReduxHistoryState) => {
  const state = getReduxPresentState(historyState);
  return {
    addingBlock: getReduxUiAddingBlock(state),
  };
};

export default connect(mapStateToProps)(EditorView);
