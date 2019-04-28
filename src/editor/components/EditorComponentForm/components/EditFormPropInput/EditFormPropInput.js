// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxRootState, ReduxDataState } from '../../../../../redux/store';
import { getComponentBlockFromReduxEditorState } from '../../../../../redux/editor/state';
import { getBlockPropsConfigKeys, getPropConfigFromBlock } from '../../../../../data/block/state';
import EditFormInput from '../EditFormInput/EditFormInput';
import {
  getNameFromPropConfig,
  getTypeFromPropConfig,
} from '../../../../../data/block/props/state';
import { DEFAULT_PROP_CONFIG_TYPE } from '../../../../../data/block/props/model';
import { updateBlockPropConfigRedux } from '../../../../../redux/editor/reducer';
import type { BlockPropsConfigTypes } from '../../../../../data/block/props/model';
import { getReduxPresentState } from '../../../../../redux/styles/state';

type Props = {
  componentKey: string,
  blockKey: string,
  propKey: string,
  onSubmit: () => void,
};

const mapStateToProps = (
  rootState: ReduxRootState,
  { componentKey, blockKey, propKey }: Props
) => {
  const state = getReduxPresentState(rootState);
  const block = getComponentBlockFromReduxEditorState(state.editor, componentKey, blockKey);
  const propKeys = getBlockPropsConfigKeys(block).filter(blockPropKey => blockPropKey !== propKey);
  const propConfig = getPropConfigFromBlock(propKey, block);
  const propName = propConfig ? getNameFromPropConfig(propConfig) : propKey;
  const propType = propConfig ? getTypeFromPropConfig(propConfig) : DEFAULT_PROP_CONFIG_TYPE;
  return {
    propKeys,
    propName,
    propType,
  };
};

const mapDispatchToProps = (dispatch, { onSubmit, componentKey, blockKey, propKey }: Props) => ({
  onSubmit: (propName: string, propType: BlockPropsConfigTypes) => {
    dispatch(updateBlockPropConfigRedux(componentKey, blockKey, propKey, propName, propType));
    onSubmit();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormInput);
