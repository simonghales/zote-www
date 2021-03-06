// @flow
import React from 'react';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import SidebarFooter from '../../components/SidebarFooter/SidebarFooter';

const DashboardView = () => (
  <React.Fragment>
    <SidebarHeader>Dashboard</SidebarHeader>
    <SidebarBody>something...</SidebarBody>
    <SidebarFooter />
  </React.Fragment>
);

export default DashboardView;
