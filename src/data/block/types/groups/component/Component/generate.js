// @flow

import type { BlockModel } from '../../../../model';
import config from './config';
import { generateBlockKey } from '../../../../keys';

const generateBlock = (): BlockModel => ({
  key: generateBlockKey(),
  blockTypeKey: config.key,
  name: config.name,
  props: {},
  propsConfig: {},
  isRootBlock: true,
});

export default generateBlock;

export function generateComponentBlock(): BlockModel {
  return generateBlock();
}
