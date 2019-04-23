// @flow
import React from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import { Route } from 'react-router-dom';
import styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';
import ComponentView from './views/ComponentView/ComponentView';
import DashboardView from './views/DashboardView/DashboardView';
import PagesView from './views/PagesView/PagesView';
import ComponentsView from './views/ComponentsView/ComponentsView';
import MixinsView from './views/MixinsView/MixinsView';
import DataView from './views/DataView/DataView';

const NavSelector = () => (
  <div className={styles.navSelectorClass}>
    <div className={styles.navSelectorTextClass}>Modules</div>
    <div className={styles.navSelectorIconClass}>
      <FaCaretDown />
    </div>
  </div>
);

const QuickSearch = () => (
  <div className={styles.quickSearchClass}>
    <div>Quick</div>
    <div className={styles.quickSearchIconClass}>
      <FaSearch size={11} />
    </div>
  </div>
);

const EditorSidebar = () => (
  <div className={styles.containerClass}>
    <Route exact path={EDITOR_PATHS.dashboard} component={DashboardView} />
    <Route exact path={EDITOR_PATHS.pagesWithSlug} component={PagesView} />
    <Route exact path={EDITOR_PATHS.components} component={ComponentsView} />
    <Route exact path={EDITOR_PATHS.mixins} component={MixinsView} />
    <Route exact path={EDITOR_PATHS.data} component={DataView} />
    <Route exact path={EDITOR_PATHS.component} component={ComponentView} />
  </div>
);

export default EditorSidebar;
