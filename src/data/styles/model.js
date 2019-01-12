// @flow

export type StateStylesModel = {
  [string]: {
    value: string,
  },
};

export type StylesModel = {
  key: string,
  mixins: {
    [string]: {
      disabledStates: {
        [string]: boolean,
      },
    },
  },
  states: {
    [string]: {
      styles: StateStylesModel,
    },
  },
};
