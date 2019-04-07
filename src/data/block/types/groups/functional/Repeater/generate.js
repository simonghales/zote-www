// @flow

import type { BlockModel } from '../../../../model';
import { generateBlockKey } from '../../../../keys';
import config from './config';
import { defaultRepeaterDataPropsValue } from './props';

export function generate(): BlockModel {
  return {
    key: generateBlockKey(),
    blockTypeKey: config.key,
    name: config.name,
    props: {
      repeaterData: {
        key: 'repeaterData',
        value: defaultRepeaterDataPropsValue,
      },
    },
    propsConfig: {},
    isRootBlock: false,
  };
}
