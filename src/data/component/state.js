// @flow

import type { ComponentModel, ComponentsModels } from './model';

export function getComponentFromComponents(
  componentKey: string,
  components: ComponentsModels
): ComponentModel {
  return components[componentKey];
}
