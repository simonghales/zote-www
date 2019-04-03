// @flow
import { uniqueId } from 'lodash';

export function generateComponentKey(): string {
  return uniqueId(`component_`);
}

export function generateBlockKey(): string {
  return uniqueId(`block_`);
}
