// @flow

export type StateStylesModel = {
  [string]: {
    value: string,
  },
};

export const STYLE_STATES = {
  default: 'default',
};

export type StyleModel = {
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

export type StylesModels = {
  [string]: StyleModel,
};
