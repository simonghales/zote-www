// @flow

import type { PropLinkBlockModel } from './PropLinkMenu';
import type { BlockAvailablePropsModel } from '../../../data/block/state';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../data/block/props/model';

export function mapBlockPropsToPropLinkBlockModels(
  availableProps: Array<BlockAvailablePropsModel>
): Array<PropLinkBlockModel> {
  return availableProps.map(blockAvailableProps => ({
    label: blockAvailableProps.blockName,
    key: blockAvailableProps.blockKey,
    options: Object.keys(blockAvailableProps.props).map(originalKey => {
      const prop = blockAvailableProps.props[originalKey];
      let fieldKey = '';
      let propKey = originalKey;
      if (prop.config.type === BLOCK_PROPS_CONFIG_TYPES.repeaterData) {
        const keys = originalKey.split('::');
        if (keys.length !== 2) throw new Error(`Invalid keys.`);
        propKey = keys[0];
        fieldKey = keys[1];
      }
      return {
        key: originalKey,
        propKey,
        fieldKey,
        title: prop.config.label ? prop.config.label : originalKey,
        subtitle: prop.value,
      };
    }),
  }));
}
