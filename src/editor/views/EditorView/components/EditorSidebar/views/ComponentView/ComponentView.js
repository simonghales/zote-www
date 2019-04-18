// @flow
import React from 'react';
import EditorSidebarModules from '../EditorSidebarModules/EditorSidebarModules';
import { selectedComponentRequired } from '../../../../../../components/SelectedComponentRequiredWrapper/SelectedComponentRequiredWrapper';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarFooter from '../../components/SidebarFooter/SidebarFooter';

const ComponentView = () => (
  <React.Fragment>
    <SidebarHeader />
    <SidebarBody>
      <EditorSidebarModules />
    </SidebarBody>
    <SidebarFooter />
  </React.Fragment>
);

export default selectedComponentRequired(ComponentView);
