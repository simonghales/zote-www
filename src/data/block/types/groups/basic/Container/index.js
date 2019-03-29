// @flow
import React from 'react';
import { FaRegSquare } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { containerPropsConfig } from './props';
import config from './config';
import ContainerComponent from './component';
import generate from './generate';

const ContainerBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: ContainerComponent,
  propsConfig: containerPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  addPropsEnabled: false,
  icon: <FaRegSquare size={8} />,
  generate,
};

export default ContainerBlock;
