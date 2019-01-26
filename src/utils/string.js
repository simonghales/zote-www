// @flow
import { camelCase } from 'lodash';

export function cleanKeyString(key: string): string {
  return key.replace(/([^a-zA-Z0-9-_])/gim, '');
}

export function getPropKey(label: string): string {
  return camelCase(label);
}
