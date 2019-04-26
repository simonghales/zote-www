// @flow
import React from 'react';
import * as styles from './styles';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import PagesList from './components/PagesList/PagesList';
import { SlimAddButton } from '../../../../../../components/Button/Button';
import { useDispatchCreateNewPage } from '../../../../../../state/hooks/pages';

const PagesView = () => {
  const createNewPage = useDispatchCreateNewPage();
  return (
    <React.Fragment>
      <SidebarHeader>Pages</SidebarHeader>
      <SidebarBody>
        <div className={styles.buttonWrapperClass}>
          <SlimAddButton onClick={createNewPage}>New Page</SlimAddButton>
        </div>
        <PagesList />
      </SidebarBody>
      {/* <SidebarFooter /> */}
    </React.Fragment>
  );
};

export default PagesView;
