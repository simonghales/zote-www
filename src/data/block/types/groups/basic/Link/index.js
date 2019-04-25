// @flow
import React from 'react';
import { FaExternalLinkAlt, FaLink, FaParagraph } from 'react-icons/fa';
import type { BlockTypeModel } from '../../../model';
import { linkPropsConfig } from './props';
import config from './config';
import LinkComponent from './component';
import generate from './generate';

const LinkBlock: BlockTypeModel = {
  key: config.key,
  name: config.name,
  component: LinkComponent,
  propsConfig: linkPropsConfig,
  propsEnabled: true,
  stylesEnabled: true,
  htmlEnabled: true,
  addPropsEnabled: false,
  icon: <FaExternalLinkAlt size={9} />,
  generate,
};

export default LinkBlock;
