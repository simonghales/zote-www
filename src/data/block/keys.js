// @flow
import firebase from 'firebase';
import { uniqueId } from 'lodash';

function generateUniqueId(prefix: string): string {
  return `${prefix}${
    firebase
      .database()
      .ref()
      .push().key
  }`;
}

export function generateComponentKey(): string {
  return generateUniqueId(`component_`);
}

export function generateBlockKey(): string {
  return generateUniqueId(`block_`);
}

export function generateRepeaterDataModelFieldKey(): string {
  return generateUniqueId(`field_`);
}

export function generateRepeaterDataItem(): string {
  return generateUniqueId(`item_`);
}

export function generatePageKey(): string {
  return generateUniqueId(`page_`);
}
