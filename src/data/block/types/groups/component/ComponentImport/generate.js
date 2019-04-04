// @flow

import type { BlockModel } from '../../../../model';
import config from './config';
import { generateBlockKey } from '../../../../keys';
import { updateBlockName, updateBlockPropValue } from '../../../../modifiers';
import { componentImportPropsConfig } from './props';

const generateBlock = (): BlockModel => ({
  key: generateBlockKey(),
  blockTypeKey: config.key,
  name: config.name,
  props: {},
  propsConfig: {},
  isRootBlock: false,
});

export default generateBlock;

export function generateComponentImportBlock(
  componentKey: string,
  componentName: string
): BlockModel {
  let block = generateBlock();
  block = updateBlockPropValue(
    block,
    componentImportPropsConfig.componentReference.key,
    componentKey
  );
  block = updateBlockName(block, componentName);
  return block;
}
