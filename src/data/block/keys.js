// @flow
import { uniqueId } from 'lodash';

export function generateBlockKey(): string {
  return uniqueId(`block_`);
}
