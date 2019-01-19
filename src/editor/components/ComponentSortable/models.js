// @flow

export type SortableBlockModel = {
  key: string,
  icon: string,
  name: string,
  children?: Array<SortableBlockModel>,
};
