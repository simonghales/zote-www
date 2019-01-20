// @flow

import type { BlockTypeModel } from '../../../model';
import { containerPropsConfig } from './props';
import config from './config';
import ContainerComponent from './component';

const ContainerBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: ContainerComponent,
  propsConfig: containerPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
};

export default ContainerBlock;
