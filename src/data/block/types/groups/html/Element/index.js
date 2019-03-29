// @flow
import React from 'react';
import { FaCode } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { htmlElementPropsConfig } from './props';
import config from './config';
import HtmlElementComponent from './component';
import generate from './generate';

const HtmlElementBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: HtmlElementComponent,
  propsConfig: htmlElementPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  addPropsEnabled: false,
  icon: <FaCode size={9} />,
  generate,
};

export default HtmlElementBlock;
