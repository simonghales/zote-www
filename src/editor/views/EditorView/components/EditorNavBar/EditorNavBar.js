// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as styles from './styles';
import { EDITOR_PATHS } from '../../../../routing/routing';

const EditorNavBar = (props: any) => {
  console.log('props', props);
  return (
    <nav className={styles.containerClass}>
      <a href={EDITOR_PATHS.dashboard}>Dashboard</a>
      <a href={EDITOR_PATHS.pages}>Pages</a>
      <a href={EDITOR_PATHS.components}>Components</a>
      <a href={EDITOR_PATHS.mixins}>Mixins</a>
    </nav>
  );
};

export default withRouter(EditorNavBar);
