// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';

const EditorNavBar = (props: any) => {
  console.log('props', props);
  return (
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
        Components
      </NavLink>
      <NavLink
        className={styles.linkClass}
        activeClassName={styles.activeLinkClass}
        to={EDITOR_PATHS.mixins}
      >
        Mixins
      </NavLink>
    </nav>
  );
};

export default withRouter(EditorNavBar);
