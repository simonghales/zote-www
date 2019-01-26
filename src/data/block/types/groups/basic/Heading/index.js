// @flow
import React from 'react';
import { FaHeading } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { headingPropsConfig } from './props';
import config from './config';
import HeadingComponent from './component';

const HeadingBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: HeadingComponent,
  propsConfig: headingPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  addPropsEnabled: false,
  icon: <FaHeading size={8} />,
};

export default HeadingBlock;
