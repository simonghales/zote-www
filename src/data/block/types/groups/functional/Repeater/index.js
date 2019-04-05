// @flow
import React from 'react';
import { FaCube } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import config from './config';
import { repeaterPropsConfig } from './props';
import RepeaterComponent from './component';
import { generate } from './generate';

const RepeaterBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: RepeaterComponent,
  propsConfig: repeaterPropsConfig,
  propsEnabled: true,
  stylesEnabled: false,
  htmlEnabled: false,
  addPropsEnabled: false,
  icon: <FaCube size={8} />,
  generate,
};

export default RepeaterBlock;
