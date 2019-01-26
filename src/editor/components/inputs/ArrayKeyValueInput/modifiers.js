// @flow

import type { EntryModel } from './ArrayKeyValueInput';

export function updateEntryInEntries(
  index: number,
  label: string,
  value: string,
  entries: Array<EntryModel>
): Array<EntryModel> {
  const updatedEntries = entries.slice();
  updatedEntries[index] = {
    key: label,
    value,
  };
  return updatedEntries;
}

export function addNewEntryToEntries(
  label: string,
  value: string,
  entries: Array<EntryModel>
): Array<EntryModel> {
  const updatedEntries = entries.slice();
  updatedEntries.unshift({
    key: label,
    value,
  });
  return updatedEntries;
}

export function removeEntryFromEntries(
  index: number,
  entries: Array<EntryModel>
): Array<EntryModel> {
  const updatedEntries = entries.slice();
  updatedEntries.splice(index, 1);
  return updatedEntries;
}
