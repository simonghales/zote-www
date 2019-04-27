// @flow

import React from 'react';
import { connect } from 'react-redux';
import Menu, { MENU_LAYOUTS } from '../Menu/Menu';
import styles from './styles';
import Text from '../Text/Text';
import { mapBlockPropsToPropLinkBlockModels } from './state';
import type { ReduxHistoryState, ReduxState } from '../../../redux/store';
import {
  getBlockPropAvailableProps,
  getComponentBlockFromReduxEditorState,
} from '../../../redux/editor/state';
import { filterAvailableProps, getMergedPropConfigFromBlock } from '../../../data/block/state';
import { DEFAULT_PROP_CONFIG_TYPE } from '../../../data/block/props/model';
import { setBlockPropLinkedRedux } from '../../../redux/editor/reducer';
import { getReduxPresentState } from '../../../redux/styles/state';

export type PropLinkOptionModel = {
  key: string,
  propKey: string,
  fieldKey?: string,
  title: string,
  subtitle: string,
};

export type PropLinkBlockModel = {
  label: string,
  key: string,
  options: Array<PropLinkOptionModel>,
};

const Option = ({ option, onClick }: { option: PropLinkOptionModel, onClick: () => void }) => (
  <div className={styles.optionClass} onClick={onClick}>
    <div>{option.title}</div>
    <div className={styles.optionSubtitleClass}>{option.subtitle}</div>
  </div>
);

const BlockOption = ({
  block,
  selectProp,
}: {
  block: PropLinkBlockModel,
  selectProp: (propKey: string, fieldKey?: string) => void,
}) => (
  <div className={styles.blockOptionClass}>
    <header className={styles.blockOptionHeaderClass}>{block.label}</header>
    <div>
      {block.options.map(option => (
        <Option
          option={option}
          key={option.key}
          onClick={() => {
            selectProp(option.propKey, option.fieldKey);
          }}
        />
      ))}
    </div>
  </div>
);

type Props = {
  close: () => void,
  blocks: Array<PropLinkBlockModel>,
  componentKey: string,
  blockKey: string,
  propKey: string,
  selectProp: (blockKey: string, propKey: string, fieldKey?: string) => void,
};

const PropLinkMenu = ({ close, blocks, selectProp }: Props) => (
  <Menu close={close} className={styles.menuClass} layout={MENU_LAYOUTS.fixed}>
    {blocks.length > 0 ? (
      blocks.map(block => (
        <BlockOption
          key={block.key}
          block={block}
          selectProp={(propKey: string, fieldKey?: string) => {
            selectProp(block.key, propKey, fieldKey);
          }}
        />
      ))
    ) : (
      <div className={styles.emptyMessageClass}>
        <Text>No props available for linking to.</Text>
      </div>
    )}
  </Menu>
);

const mapStateToProps = (
  historyState: ReduxHistoryState,
  { componentKey, blockKey, propKey }: Props
) => {
  const state = getReduxPresentState(historyState);
  const availableProps = getBlockPropAvailableProps(componentKey, blockKey, state.editor);
  const block = getComponentBlockFromReduxEditorState(state.editor, componentKey, blockKey);
  const propConfig = getMergedPropConfigFromBlock(propKey, block);
  const propType = propConfig ? propConfig.type : DEFAULT_PROP_CONFIG_TYPE;
  const blocks = mapBlockPropsToPropLinkBlockModels(filterAvailableProps(availableProps, propType));
  return {
    blocks,
  };
};

const mapDispatchToProps = (dispatch: any, { close, componentKey, blockKey, propKey }: Props) => ({
  selectProp: (selectedBlockKey: string, selectedPropKey: string, fieldKey?: string) => {
    dispatch(
      setBlockPropLinkedRedux(
        componentKey,
        blockKey,
        propKey,
        selectedBlockKey,
        selectedPropKey,
        fieldKey
      )
    );
    close();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropLinkMenu);
