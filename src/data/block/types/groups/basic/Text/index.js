// @flow
import React from 'react';
import { FaParagraph } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { textPropsConfig } from './props';
import config from './config';
import TextComponent from './component';

const TextBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: TextComponent,
  propsConfig: textPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  addPropsEnabled: false,
  icon: <FaParagraph size={8} />,
};

export default TextBlock;
