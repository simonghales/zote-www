// @flow

import type { EntryModel } from './ArrayKeyValueInput';

export function getEntriesFromPropValue(value: any): Array<EntryModel> {
  if (!value) {
    return [];
  }
  if (value instanceof Array) {
    return value;
  }
  return [];
}

export function doesEntryExistInEntries(key: string, entries: Array<EntryModel>): boolean {
  return entries.map(entry => entry.key).includes(key);
}
