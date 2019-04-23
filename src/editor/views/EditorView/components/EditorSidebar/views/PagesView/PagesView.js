// @flow
import React from 'react';
import * as styles from './styles';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import PagesList from './components/PagesList/PagesList';
import { SlimAddButton } from '../../../../../../components/Button/Button';

const PagesView = () => (
  <React.Fragment>
    <SidebarHeader>Pages</SidebarHeader>
    <SidebarBody>
      <div className={styles.buttonWrapperClass}>
        <SlimAddButton onClick={() => {}}>Add Page</SlimAddButton>
      </div>
      <PagesList />
    </SidebarBody>
    {/* <SidebarFooter /> */}
  </React.Fragment>
);

export default PagesView;
