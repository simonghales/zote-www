// @flow
import React from 'react';
import SidebarHeader from '../../components/SidebarHeader/SidebarHeader';
import SidebarBody from '../../components/SidebarBody/SidebarBody';
import ComponentsList from './components/ComponentsList/ComponentsList';
import { SlimAddButton } from '../../../../../../components/Button/Button';
import * as styles from './styles';
import { useDispatchCreateNewComponent } from '../../../../../../state/hooks/components';
import SidebarFooter from '../../components/SidebarFooter/SidebarFooter';

const ComponentsView = () => {
  const createNewComponent = useDispatchCreateNewComponent();
  return (
    <React.Fragment>
      <SidebarHeader>Blocks</SidebarHeader>
      <SidebarBody>
        <div className={styles.buttonWrapperClass}>
          <SlimAddButton onClick={createNewComponent}>New Block</SlimAddButton>
        </div>
        <ComponentsList />
      </SidebarBody>
      <SidebarFooter />
    </React.Fragment>
  );
};

export default ComponentsView;
