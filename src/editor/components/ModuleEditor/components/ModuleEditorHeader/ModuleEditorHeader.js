// @flow
import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import AutosizeInput from 'react-input-autosize';
import * as styles from './styles';
import { useGetSelectedBlock } from '../../../SelectedBlockContextWrapper/context';
import { getBlockName } from '../../../../../data/block/state';
import BlockEditOptions from './components/BlockEditOptions/BlockEditOptions';

// class ModuleEditorHeader extends React.Component<Props, State> {
//
//   render() {
//
//   }
//
// }

const ModuleEditorHeader = () => {
  const block = useGetSelectedBlock();
  const name = getBlockName(block);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [editingName, setEditingName] = useState(false);

  let textInput = null;

  const handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (!editingName) return;
    const { value } = event.target;
  };

  const editName = () => {
    setEditingName(true);
    if (textInput) {
      console.log('textInput', textInput);
      textInput.focus();
    }
  };

  return (
    <Tooltip
      trigger={['click']}
      overlay={<BlockEditOptions setTooltipVisible={setTooltipVisible} editName={editName} />}
      placement="bottomLeft"
      align={{ offset: [20, -15] }}
      visible={tooltipVisible}
      onVisibleChange={visible => {
        setTooltipVisible(visible);
      }}
    >
      <header className={styles.headerClass}>
        <div className={styles.headerTextClass}>
          <AutosizeInput
            value={name}
            inputRef={input => {
              textInput = input;
            }}
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.headerIconClass}>
          <FaCaretDown />
        </div>
      </header>
    </Tooltip>
  );
};

export default ModuleEditorHeader;
