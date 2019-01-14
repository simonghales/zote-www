// @flow
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styles from './styles';
import { SolidButton } from '../../../../components/Button/Button';
import SiteLogo from '../../../../components/SiteLogo/SiteLogo';
import EditorSidebarModules from './views/EditorSidebarModules/EditorSidebarModules';

const NavSelector = () => (
  <div className={styles.navSelectorClass}>
    <div className={styles.navSelectorTextClass}>Modules</div>
    <div className={styles.navSelectorIconClass}>
      <FaCaretDown />
    </div>
  </div>
);

const EditorSidebar = () => (
  <div className={styles.containerClass}>
    <div className={styles.headerClass}>
      <div className={styles.logoClass}>
        <SiteLogo />
      </div>
      <NavSelector />
    </div>
    <div className={styles.middleClass}>
      <EditorSidebarModules />
    </div>
    <div className={styles.footerClass}>
      <SolidButton>Save Changes</SolidButton>
    </div>
  </div>
);

export default EditorSidebar;
