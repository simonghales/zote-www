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

export type StyleStateMixinsModel = {
  [string]: {
    disabledStates: {
      [string]: boolean,
    },
  },
};

export type StyleStateModel = {
  mixins: StyleStateMixinsModel,
  styles: StateStylesModel,
};

export type StyleStatesModel = {
  [string]: StyleStateModel,
};

export type StyleModel = {
  key: string,
  states: StyleStatesModel,
};

export type StylesModels = {
  [string]: StyleModel,
};
