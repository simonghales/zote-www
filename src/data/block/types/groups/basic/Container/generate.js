// @flow

import type { BlockModel } from '../../../../model';
import config from './config';

const generateBlock = (): BlockModel => ({
  key: '',
  blockTypeKey: config.key,
  name: config.name,
  props: '',
  propsConfig: '',
  styles: '',
  isRootBlock: '',
});

export default generateBlock;
