// @flow

import type { BlockTypeModel } from '../../../model';
import { containerDefaultProps, containerPropsConfig } from './props';
import config from './config';
import ContainerComponent from './component';

const ContainerBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: ContainerComponent,
  defaultProps: containerDefaultProps,
  propsConfig: containerPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
};

export default ContainerBlock;