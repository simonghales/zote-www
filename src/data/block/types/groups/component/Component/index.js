// @flow
import React from 'react';
import { FaCube } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { componentPropsConfig } from './props';
import config from './config';
import ComponentComponent from './component';

const ComponentBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: ComponentComponent,
  propsConfig: componentPropsConfig,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  addPropsEnabled: true,
  icon: <FaCube size={8} />,
};

export default ComponentBlock;
