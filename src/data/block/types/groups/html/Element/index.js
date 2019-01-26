// @flow
import React from 'react';
import { FaCode } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { htmlElementPropsConfig } from './props';
import config from './config';
import HtmlElementComponent from './component';

const HtmlElementBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: HtmlElementComponent,
  propsConfig: htmlElementPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  icon: <FaCode size={9} />,
};

export default HtmlElementBlock;
