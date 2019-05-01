// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';
import type { ReduxRootState, ReduxDataState } from '../../../../../redux/store';
import SaveControls from './components/SaveControls/SaveControls';
import { useGetEditorPath } from '../../../../state/hooks/routing';

const EditorNavBar = () => {
  const dashboardPath = useGetEditorPath(EDITOR_PATHS.dashboard);
  const pagesPath = useGetEditorPath(EDITOR_PATHS.pages);
  const componentsPath = useGetEditorPath(EDITOR_PATHS.components);
  const mixinsPath = useGetEditorPath(EDITOR_PATHS.mixins);
  const mediaPath = useGetEditorPath(EDITOR_PATHS.media);
  const dataPath = useGetEditorPath(EDITOR_PATHS.data);
  return (
    <div className={styles.containerClass}>
      <nav className={styles.navClass}>
        <NavLink
          className={styles.linkClass}
          exact
          activeClassName={styles.activeLinkClass}
          to={dashboardPath}
        >
          Dashboard
        </NavLink>
        <NavLink
          className={styles.linkClass}
          activeClassName={styles.activeLinkClass}
          to={pagesPath}
        >
          Pages
        </NavLink>
        <NavLink
          className={styles.linkClass}
          activeClassName={styles.activeLinkClass}
          to={componentsPath}
        >
          Blocks
        </NavLink>
        <NavLink
          className={styles.linkClass}
          activeClassName={styles.activeLinkClass}
          to={mixinsPath}
        >
          Mixins
        </NavLink>
        <NavLink
          className={styles.linkClass}
          activeClassName={styles.activeLinkClass}
          to={mediaPath}
        >
          Media
        </NavLink>
        <NavLink
          className={styles.linkClass}
          activeClassName={styles.activeLinkClass}
          to={dataPath}
        >
          Data
        </NavLink>
      </nav>
      <SaveControls />
    </div>
  );
};

export default withRouter(EditorNavBar);
