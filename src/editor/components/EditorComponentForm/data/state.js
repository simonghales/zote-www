// @flow

import type { BlockPropConfigModel } from '../../../../data/block/props/model';
import { FORM_INPUT_TYPES } from '../components/FormInput/FormInput';
import { EDITOR_FORM_REDUX_TYPES } from './models';

export function mapBlockPropConfigsToEditorFormInputModel(
  blockPropConfigs: Array<BlockPropConfigModel>
) {
  return blockPropConfigs.map(blockPropConfig => ({
    name: blockPropConfig.label,
    key: blockPropConfig.key,
    inactive: false,
    defaultValue: '',
    value: 'todo',
    onChange: () => {},
    // reduxConnected: {
    //   type: EDITOR_FORM_REDUX_TYPES.prop,
    // },
    inputType: FORM_INPUT_TYPES.string,
  }));
}
