// @flow

import type { BlockPropConfigModel } from '../../../../data/block/props/model';
import { FORM_INPUT_TYPES } from '../components/FormInput/FormInput';
import { EDITOR_FORM_REDUX_TYPES } from './models';
import type { EditorFormInputModel } from './models';

export function mapBlockPropConfigsToEditorFormInputModel(
  blockPropConfigs: Array<BlockPropConfigModel>
): Array<EditorFormInputModel> {
  return blockPropConfigs.map(blockPropConfig => ({
    name: blockPropConfig.label ? blockPropConfig.label : blockPropConfig.key,
    key: blockPropConfig.key,
    inactive: false,
    defaultValue: '',
    value: '',
    onChange: () => {},
    reduxConnected: {
      type: EDITOR_FORM_REDUX_TYPES.prop,
    },
    inputType: FORM_INPUT_TYPES.string,
  }));
}
