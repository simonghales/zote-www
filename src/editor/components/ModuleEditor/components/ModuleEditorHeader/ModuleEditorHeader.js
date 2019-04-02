// @flow
import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Tooltip from 'rc-tooltip';
import AutosizeInput from 'react-input-autosize';
import { connect } from 'react-redux';
import * as styles from './styles';
import { useGetSelectedBlock } from '../../../SelectedBlockContextWrapper/context';
import { getBlockName } from '../../../../../data/block/state';
import BlockEditOptions from './components/BlockEditOptions/BlockEditOptions';
import { setBlockNameRedux } from '../../../../../redux/editor/reducer';
import { useGetSelectedComponent } from '../../../SelectedComponentContextWrapper/context';

type Props = {
  renameBlock: (componentKey: string, blockKey: string, name: string) => void,
};

const ModuleEditorHeader = ({ renameBlock }: Props) => {
  const component = useGetSelectedComponent();
  const block = useGetSelectedBlock();
  const name = getBlockName(block);
  const [localName, setLocalName] = useState(name);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [textInput, setTextInput] = useState(null);

  const handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (!editingName) return;
    const { value } = event.target;
    setLocalName(value);
  };

  const handleBlur = () => {
    setEditingName(false);
    if (localName) {
      renameBlock(component.key, block.key, localName);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (textInput) {
        textInput.blur();
      }
    }
  };

  const editName = () => {
    setLocalName(name);
    setEditingName(true);
    if (textInput) {
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
            value={editingName ? localName : name}
            inputRef={setTextInput}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            readOnly={!editingName}
          />
        </div>
        <div className={styles.headerIconClass}>
          <FaCaretDown />
        </div>
      </header>
    </Tooltip>
  );
};

const mapDispatchToProps = {
  renameBlock: (componentKey: string, blockKey: string, name: string) =>
    setBlockNameRedux(componentKey, blockKey, name),
};

export default connect(
  null,
  mapDispatchToProps
)(ModuleEditorHeader);
