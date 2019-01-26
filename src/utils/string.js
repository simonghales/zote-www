// @flow

export function cleanKeyString(key: string): string {
  return key.replace(/([^a-zA-Z0-9-_])/gim, '');
}
