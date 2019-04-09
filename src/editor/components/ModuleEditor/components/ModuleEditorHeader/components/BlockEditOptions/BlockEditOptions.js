// @flow
import React from 'react';
import { FaRetweet, FaTrash, FaEdit, FaCube } from 'react-icons/fa';
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
import {
  convertBlockIntoComponentRedux,
  deleteBlockFromComponentRedux,
  wrapBlockWithRepeaterRedux,
} from '../../../../../../../redux/editor/reducer';

type Props = {
  editName: () => void,
  setTooltipVisible: (visible: boolean) => void,
  convertIntoComponent: (componentKey: string, blockKey: string) => void,
  deleteBlock: (componentKey: string, blockKey: string, deleteChildren: boolean) => void,
  wrapBlockWithRepeater: (componentKey: string, blockKey: string) => void,
};

const BlockEditOptions = ({
  convertIntoComponent,
  deleteBlock,
  editName,
  setTooltipVisible,
  wrapBlockWithRepeater,
}: Props) => {
  const block: BlockModel = useGetSelectedBlock();
  const blockKey = getBlockKey(block);
  const component: ComponentModel = useGetSelectedComponent();
  const componentKey = getKeyFromComponent(component);
  const deleteHandler = () => {
    deleteBlock(componentKey, blockKey, false);
    setTooltipVisible(false);
    // todo - clean up styles
  };
  const deleteHandlerWithChildren = () => {
    deleteBlock(componentKey, blockKey, true);
    setTooltipVisible(false);
    // todo - clean up styles
  };
  const renameHandler = () => {
    editName();
    setTooltipVisible(false);
  };
  const convertIntoComponentHandler = () => {
    convertIntoComponent(componentKey, blockKey);
    setTooltipVisible(false);
  };

  const wrapBlockWithRepeaterHandler = () => {
    wrapBlockWithRepeater(componentKey, blockKey);
    setTooltipVisible(false);
  };

  let options = [
    {
      label: 'Rename',
      icon: <FaEdit />,
      onClick: renameHandler,
    },
  ];

  if (!block.isRootBlock) {
    options = options.concat([
      {
        label: 'Convert into Component',
        icon: <FaCube />,
        onClick: convertIntoComponentHandler,
      },
      {
        label: 'Wrap Block with Repeater',
        icon: <FaRetweet />,
        onClick: wrapBlockWithRepeaterHandler,
      },
      {
        label: 'Delete',
        icon: <FaTrash />,
        onClick: deleteHandler,
      },
      {
        label: 'Delete (with children)',
        icon: <FaTrash />,
        onClick: deleteHandlerWithChildren,
      },
    ]);
  }

  return (
    <DropdownMenu layout={MENU_LAYOUTS.fixed}>
      <DropdownMenuList options={options} />
    </DropdownMenu>
  );
};

const mapDispatchToProps = {
  wrapBlockWithRepeater: (componentKey: string, blockKey: string) =>
    wrapBlockWithRepeaterRedux(componentKey, blockKey),
  convertIntoComponent: (componentKey: string, blockKey: string) =>
    convertBlockIntoComponentRedux(componentKey, blockKey),
  deleteBlock: (componentKey: string, blockKey: string, deleteChildren: boolean) =>
    deleteBlockFromComponentRedux(componentKey, blockKey, deleteChildren),
};

export default connect(
  null,
  mapDispatchToProps
)(BlockEditOptions);
