// @flow

import { FaCube } from 'react-icons/fa';
import React from 'react';
import type { BlockTypeModel } from '../../../model';
import config from './config';
import ComponentImportComponent from './component';
import { componentImportPropsConfig } from './props';
import generate from './generate';

const ComponentImportBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: ComponentImportComponent,
  propsConfig: componentImportPropsConfig,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  addPropsEnabled: false,
  icon: <FaCube size={8} />,
  generate,
};

export default ComponentImportBlock;
