// @flow
import React from 'react';
import { FaCube } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { componentPropsConfig } from './props';
import config from './config';
import PageComponentComponent from './component';
import generate from './generate';

const PageComponentBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: PageComponentComponent,
  propsConfig: componentPropsConfig,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  addPropsEnabled: true,
  icon: <FaCube size={8} />,
  generate,
};

export default PageComponentBlock;
