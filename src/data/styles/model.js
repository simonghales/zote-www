// @flow

export type RawStyleModel = {
  value: string,
};

export type StateStylesModel = {
  [string]: RawStyleModel,
};

export const STYLE_STATES = {
  default: 'default',
};

export type StyleStateModel = {
  styles: StateStylesModel,
};

export type StyleStatesModel = {
  [string]: StyleStateModel,
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
  states: StyleStatesModel,
};

export type StylesModels = {
  [string]: StyleModel,
};
