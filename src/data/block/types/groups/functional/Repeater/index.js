// @flow
import React from 'react';
import { FaRetweet } from 'react-icons/fa';
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
  icon: <FaRetweet size={9} />,
  generate,
};

export default RepeaterBlock;
