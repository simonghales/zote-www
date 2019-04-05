// @flow

import type { BlockModel } from '../../../../model';
import { generateBlockKey } from '../../../../keys';
import config from './config';

export function generate(): BlockModel {
  return {
    key: generateBlockKey(),
    blockTypeKey: config.key,
    name: config.name,
    props: {},
    propsConfig: {},
    isRootBlock: false,
  };
}
