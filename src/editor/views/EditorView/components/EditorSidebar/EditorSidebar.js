// @flow
import React from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import { Route } from 'react-router-dom';
import styles from './styles';
import { SolidButton } from '../../../../components/Button/Button';
import { EDITOR_PATHS } from '../../../../routing/routing';
import EditorSidebarComponentView from './views/EditorSidebarComponentView/EditorSidebarComponentView';

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
    <div className={styles.headerClass}>
      <div className={styles.logoClass}>Components</div>
    </div>
    <div className={styles.middleClass}>
      <Route exact path={EDITOR_PATHS.component} component={EditorSidebarComponentView} />
    </div>
    <div className={styles.footerClass}>
      <SolidButton>Save Changes</SolidButton>
    </div>
  </div>
);

export default EditorSidebar;
