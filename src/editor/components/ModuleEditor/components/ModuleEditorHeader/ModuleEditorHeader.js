// @flow
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import * as styles from './styles';
import { useGetSelectedBlock } from '../../../SelectedBlockContextWrapper/context';
import { getBlockName } from '../../../../../data/block/state';
import BlockEditOptions from './components/BlockEditOptions/BlockEditOptions';

const ModuleEditorHeader = () => {
  const block = useGetSelectedBlock();
  const name = getBlockName(block);
  return (
    <Tooltip
      trigger={['click']}
      overlay={<BlockEditOptions />}
      placement="bottomLeft"
      align={{ offset: [20, -15] }}
    >
      <header className={styles.headerClass}>
        <div className={styles.headerTextClass}>{name}</div>
        <div className={styles.headerIconClass}>
          <FaCaretDown />
        </div>
      </header>
    </Tooltip>
  );
};

export default ModuleEditorHeader;
