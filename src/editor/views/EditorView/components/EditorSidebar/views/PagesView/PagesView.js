// @flow
import React from 'react';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import SidebarFooter from '../../components/SidebarFooter/SidebarFooter';
import PagesList from './components/PagesList/PagesList';

const PagesView = () => (
  <React.Fragment>
    <SidebarHeader>Pages</SidebarHeader>
    <SidebarBody>
      <PagesList />
    </SidebarBody>
    <SidebarFooter />
  </React.Fragment>
);

export default PagesView;
