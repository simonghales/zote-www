// @flow
import React from 'react';
import { FaLink, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import styles from './styles';
import type { ReduxRootState, ReduxDataState } from '../../../../../redux/store';
import { getComponentBlockFromReduxEditorState } from '../../../../../redux/editor/state';
import {
  getMergedPropConfigFromBlock,
  getNameFromBlock,
  getPropFromBlock,
  getPropValueFromBlock,
} from '../../../../../data/block/state';
import { getLabelFromPropConfig } from '../../../../../data/block/props/state';
import { removeBlockPropLinkRedux } from '../../../../../redux/editor/reducer';
import { getReduxPresentState } from '../../../../../redux/styles/state';

type Props = {
  componentKey: string,
  blockKey: string,
  propKey: string,
  linkedBlockKey: string,
  linkedPropKey: string,
  linkedFieldKey?: string,
  blockName: string,
  propName: string,
  removePropLink: () => void,
  editLink: () => void,
};

const LinkedPropInput = ({ blockName, propName, removePropLink, editLink }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass} onClick={editLink}>
      <FaLink />
    </div>
    <div className={styles.valueContainerClass}>
      <div className={styles.propNameClass}>{propName}</div>
      <div className={styles.blockNameClass}>{blockName}</div>
    </div>
    <div className={styles.iconClass} onClick={removePropLink}>
      <FaTimes />
    </div>
  </div>
);

const mapStateToProps = (
  rootState: ReduxRootState,
  { componentKey, linkedBlockKey, linkedPropKey, linkedFieldKey = '' }: Props
) => {
  const state = getReduxPresentState(rootState);
  let block;
  try {
    block = getComponentBlockFromReduxEditorState(state.editor, componentKey, linkedBlockKey);
  } catch (e) {
    return {
      blockName: '',
      propName: '',
    };
  }
  const propValue = getPropValueFromBlock(linkedPropKey, block);
  const propConfig = getMergedPropConfigFromBlock(linkedPropKey, block);
  const propName = propConfig
    ? getLabelFromPropConfig(propConfig, propValue, linkedFieldKey)
    : linkedPropKey;
  const blockName = getNameFromBlock(block);
  return {
    blockName,
    propName,
  };
};

const mapDispatchToProps = (dispatch: any, { componentKey, blockKey, propKey }: Props) => ({
  removePropLink: () => {
    dispatch(removeBlockPropLinkRedux(componentKey, blockKey, propKey));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedPropInput);
