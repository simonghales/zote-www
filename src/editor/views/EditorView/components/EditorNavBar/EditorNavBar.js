// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaRedo, FaUndo } from 'react-icons/fa';
import * as styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';

const EditorNavBar = (props: any) => (
  <div className={styles.containerClass}>
    <nav className={styles.navClass}>
      <NavLink
        className={styles.linkClass}
        exact
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.dashboard}
      >
        Dashboard
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.pages}
      >
        Pages
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.components}
      >
        Blocks
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.mixins}
      >
        Mixins
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.media}
      >
        Media
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.data}
      >
        Data
      </NavLink>
    </nav>
    <div className={styles.optionsClass}>
      <div className={styles.smallButtonClass}>
        <FaRedo size={11} />
      </div>
      <div className={styles.smallButtonClass}>
        <FaUndo size={11} />
      </div>
      <div className={styles.saveChangesClass}>Save Changes</div>
    </div>
  </div>
);

export default withRouter(EditorNavBar);
