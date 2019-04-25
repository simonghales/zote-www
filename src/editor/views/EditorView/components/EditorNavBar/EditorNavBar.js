// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';

const EditorNavBar = (props: any) => (
  <nav className={styles.containerClass}>
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
      to={EDITOR_PATHS.data}
    >
      Data
    </NavLink>
  </nav>
);

export default withRouter(EditorNavBar);
