// @flow

import type { PropLinkBlockModel } from './PropLinkMenu';
import type { BlockAvailablePropsModel } from '../../../data/block/state';

export function mapBlockPropsToPropLinkBlockModels(
  availableProps: Array<BlockAvailablePropsModel>
): Array<PropLinkBlockModel> {
  return availableProps.map(blockAvailableProps => ({
    label: blockAvailableProps.blockName,
    key: blockAvailableProps.blockKey,
    options: Object.keys(blockAvailableProps.props).map(propKey => {
      const prop = blockAvailableProps.props[propKey];
      return {
        key: propKey,
        title: prop.config.label ? prop.config.label : propKey,
        subtitle: prop.value,
      };
    }),
  }));
}
