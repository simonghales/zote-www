// @flow
import React from 'react';
import EditorSidebarModules from '../EditorSidebarModules/EditorSidebarModules';
import SelectedComponentRequiredWrapper from '../../../../../../components/SelectedComponentRequiredWrapper/SelectedComponentRequiredWrapper';

const EditorSidebarComponentView = () => (
  <SelectedComponentRequiredWrapper>
    <EditorSidebarModules />
  </SelectedComponentRequiredWrapper>
);

export default EditorSidebarComponentView;
