// @flow

import type { BlockModel } from '../../../../model';
import config from './config';
import { generateBlockKey } from '../../../../keys';
import { updateBlockName, updateBlockPropValue } from '../../../../modifiers';
import { componentImportPropsConfig } from './props';

const generateBlock = ({
  componentKey = '',
  name = '',
}: {
  componentKey: string,
  name?: string,
}): BlockModel => ({
  key: generateBlockKey(),
  blockTypeKey: config.key,
  name: name || config.name,
  props: {
    [componentImportPropsConfig.componentReference.key]: {
      value: componentKey,
    },
  },
  propsConfig: {},
  isRootBlock: false,
});

export default generateBlock;

export function generateComponentImportBlock(
  componentKey: string,
  componentName: string
): BlockModel {
  const block = generateBlock({
    componentKey,
    name: componentName,
  });
  return block;
}
