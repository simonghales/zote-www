// @flow
import React from 'react';
import EditorSidebarModules from '../EditorSidebarModules/EditorSidebarModules';
import { selectedComponentRequired } from '../../../../../../components/SelectedComponentRequiredWrapper/SelectedComponentRequiredWrapper';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarFooter from '../../components/SidebarFooter/SidebarFooter';
import { useGetSelectedComponent } from '../../../../../../components/SelectedComponentContextWrapper/context';
import { getComponentName } from '../../../../../../../data/component/state';

const ComponentView = () => {
  const component = useGetSelectedComponent();
  return (
    <React.Fragment>
      <SidebarHeader>{getComponentName(component)}</SidebarHeader>
      <SidebarBody>
        <EditorSidebarModules />
      </SidebarBody>
      <SidebarFooter />
    </React.Fragment>
  );
};

export default selectedComponentRequired(ComponentView);
