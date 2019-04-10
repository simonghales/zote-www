// @flow

import type { BlockTypeModel } from '../../../../../data/block/types/model';
import type { ComponentModel } from '../../../../../data/component/model';
import ComponentImportBlock from '../../../../../data/block/types/groups/component/ComponentImport';
import { getComponentName } from '../../../../../data/component/state';

export type AddBlockModel = {
  key: string,
  blockTypeKey: string,
  componentKey?: string,
  name: string,
  icon: any,
};

export function mapBlockTypesToAddBlock(blocks: Array<BlockTypeModel>): Array<AddBlockModel> {
  return blocks.map(block => ({
    key: block.key,
    blockTypeKey: block.key,
    name: block.name,
    icon: block.icon,
  }));
}

export function mapComponentsToAddBlock(components: Array<ComponentModel>): Array<AddBlockModel> {
  return components.map(component => ({
    key: component.key,
    blockTypeKey: ComponentImportBlock.key,
    name: getComponentName(component),
    icon: ComponentImportBlock.icon,
  }));
}
