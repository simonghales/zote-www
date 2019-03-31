// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MENU_LAYOUTS } from '../../../../../Menu/Menu';
import DropdownMenuList from '../../../../../DropdownMenuList/DropdownMenuList';
import DropdownMenu from '../../../../../DropdownMenu/DropdownMenu';
import { useGetSelectedBlock } from '../../../../../SelectedBlockContextWrapper/context';
import type { BlockModel } from '../../../../../../../data/block/model';
import { getBlockKey } from '../../../../../../../data/block/state';
import type { ComponentModel } from '../../../../../../../data/component/model';
import { useGetSelectedComponent } from '../../../../../SelectedComponentContextWrapper/context';
import { getKeyFromComponent } from '../../../../../../../data/component/state';
import { deleteBlockFromComponentRedux } from '../../../../../../../redux/editor/reducer';

type Props = {
  deleteBlock: (componentKey: string, blockKey: string, deleteChildren: boolean) => void,
};

const BlockEditOptions = ({ deleteBlock }: Props) => {
  const block: BlockModel = useGetSelectedBlock();
  const blockKey = getBlockKey(block);
  const component: ComponentModel = useGetSelectedComponent();
  const componentKey = getKeyFromComponent(component);
  const deleteHandler = () => {
    deleteBlock(componentKey, blockKey, false);
    // todo - clean up styles
  };
  const deleteHandlerWithChildren = () => {
    deleteBlock(componentKey, blockKey, true);
    // todo - clean up styles
  };
  return (
    <DropdownMenu layout={MENU_LAYOUTS.fixed}>
      <DropdownMenuList
        options={[
          {
            label: 'Delete',
            onClick: deleteHandler,
          },
          {
            label: 'Delete (with children)',
            onClick: deleteHandlerWithChildren,
          },
        ]}
      />
    </DropdownMenu>
  );
};

const mapDispatchToProps = {
  deleteBlock: (componentKey: string, blockKey: string, deleteChildren: boolean) =>
    deleteBlockFromComponentRedux(componentKey, blockKey, deleteChildren),
};

export default connect(
  null,
  mapDispatchToProps
)(BlockEditOptions);
