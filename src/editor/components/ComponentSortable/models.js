// @flow

export type SortableBlockModel = {
  id: string,
  blockKey: string,
  children: Array<SortableBlockModel>,
  childrenEnabled: boolean,
  classes: string,
  selected: boolean,
};

export const DUMMY_SORTABLE_BLOCKS: Array<SortableBlockModel> = [
  {
    id: 'todo',
    blockKey: 'todo',
    children: [
      {
        id: 'child',
        blockKey: 'child',
        children: [
          {
            id: 'child2',
            blockKey: 'child2',
            children: [],
            childrenEnabled: false,
            classes: '',
            selected: false,
          },
        ],
        childrenEnabled: true,
        classes: '',
        selected: true,
      },
    ],
    childrenEnabled: true,
    classes: '',
    selected: false,
  },
];
