// @flow
import React from 'react';
import type { Node } from 'react';
import type {
  BlockPropConfigModel,
  BlockPropsConfigTypes,
} from '../../../../data/block/props/model';
import { FORM_INPUT_TYPES } from '../components/FormInput/FormInput';
import { EDITOR_FORM_REDUX_TYPES } from './models';
import type { EditorFormInputModel, EditorFormInputPropInputModel } from './models';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../data/block/props/model';
import type { FormInputTypes } from '../components/FormInput/FormInput';
import type { BlockModel } from '../../../../data/block/model';
import HeadingBlock from '../../../../data/block/types/groups/basic/Heading';
import ContainerBlock from '../../../../data/block/types/groups/basic/Container';
import { isPropCustom, isPropDeletable, isPropEditable } from '../../../../data/block/props/state';

const MAPPED_PROP_TYPE_TO_FORM_INPUT_TYPE: {
  [string]: FormInputTypes,
} = {
  [BLOCK_PROPS_CONFIG_TYPES.string]: FORM_INPUT_TYPES.string,
  [BLOCK_PROPS_CONFIG_TYPES.html]: FORM_INPUT_TYPES.html,
  [BLOCK_PROPS_CONFIG_TYPES.module]: FORM_INPUT_TYPES.string,
  [BLOCK_PROPS_CONFIG_TYPES.blocks]: FORM_INPUT_TYPES.string,
  [BLOCK_PROPS_CONFIG_TYPES.propReference]: FORM_INPUT_TYPES.string,
  [BLOCK_PROPS_CONFIG_TYPES.repeaterData]: FORM_INPUT_TYPES.string,
  [BLOCK_PROPS_CONFIG_TYPES.htmlAttributes]: FORM_INPUT_TYPES.htmlAttributes,
};

const MAPPED_BLOCK_TYPE_TO_FORM_INPUT_TYPE = {
  [ContainerBlock.key]: FORM_INPUT_TYPES.htmlContainer,
  [HeadingBlock.key]: FORM_INPUT_TYPES.htmlHeading,
};

export function getBlockHtmlPropEditorInputType(block: BlockModel): FormInputTypes {
  const mappedInput = MAPPED_BLOCK_TYPE_TO_FORM_INPUT_TYPE[block.blockTypeKey];
  if (mappedInput) return mappedInput;
  return FORM_INPUT_TYPES.html;
}

const getMappedPropTypeToFormInputType = (propType: BlockPropsConfigTypes): FormInputTypes => {
  const mapped = MAPPED_PROP_TYPE_TO_FORM_INPUT_TYPE[propType];
  if (mapped) return mapped;
  return FORM_INPUT_TYPES.string;
};

export function getBlockPropEditorInputType(
  block: BlockModel,
  blockPropConfig: BlockPropConfigModel
): FormInputTypes {
  if (blockPropConfig.type === BLOCK_PROPS_CONFIG_TYPES.html) {
    return getBlockHtmlPropEditorInputType(block);
  }
  return getMappedPropTypeToFormInputType(blockPropConfig.type);
}

export function getBlockPropInputConfig(
  blockPropConfig: BlockPropConfigModel
): EditorFormInputPropInputModel | null {
  if (!isPropCustom(blockPropConfig)) {
    return null;
  }
  return {
    editable: isPropEditable(blockPropConfig),
    deleteable: isPropDeletable(blockPropConfig),
  };
}

export function mapBlockPropConfigsToEditorFormInputModel(
  blockPropConfigs: Array<BlockPropConfigModel>,
  block: BlockModel
): Array<EditorFormInputModel> {
  return blockPropConfigs.map(blockPropConfig => ({
    name: blockPropConfig.label ? blockPropConfig.label : blockPropConfig.key,
    key: blockPropConfig.key,
    inactive: false,
    defaultValue: '',
    value: '',
    onChange: () => {},
    propInput: getBlockPropInputConfig(blockPropConfig),
    reduxConnected: {
      type: EDITOR_FORM_REDUX_TYPES.prop,
    },
    inputType: getBlockPropEditorInputType(block, blockPropConfig),
  }));
}
