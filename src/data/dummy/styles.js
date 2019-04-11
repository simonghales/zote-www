// @flow
import type { StyleModel } from '../styles/model';
import { STYLE_STATES } from '../styles/model';
import { getBlockStyleKeyFormat } from '../block/state';
import type { MixinModel } from '../mixin/model';

export const DUMMY_MIXIN_STYLES: StyleModel = {
  key: `DUMMY_MIXIN_STYLES`,
  states: {
    [STYLE_STATES.default]: {
      mixins: {},
      styles: {
        'font-size': {
          value: '30px',
        },
      },
    },
    '&:active': {
      mixins: {},
      styles: {
        'background-color': {
          value: 'grey',
        },
      },
    },
  },
};

export const DUMMY_MIXIN_TEXT_STYLES: StyleModel = {
  key: 'DUMMY_MIXIN_TEXT_STYLES',
  states: {
    [STYLE_STATES.default]: {
      mixins: {},
      styles: {
        'font-size': {
          value: '50px',
        },
      },
    },
  },
};

export const DUMMY_MIXIN: MixinModel = {
  key: 'DUMMY_MIXIN',
  stylesKey: 'DUMMY_MIXIN_STYLES',
};

export const DUMMY_MIXIN_TEXT: MixinModel = {
  key: 'DUMMY_MIXIN_TEXT',
  stylesKey: 'DUMMY_MIXIN_TEXT_STYLES',
};

export const DUMMY_BLOCK_STYLES: StyleModel = {
  key: getBlockStyleKeyFormat('DUMMY_CONTAINER_BLOCK'),
  states: {
    [STYLE_STATES.default]: {
      mixins: {
        [DUMMY_MIXIN.key]: {
          disabledStates: {},
        },
      },
      styles: {
        'font-family': {
          value: 'Roboto',
        },
        'text-align': {
          value: 'center',
        },
      },
    },
    '&:hover': {
      mixins: {
        [DUMMY_MIXIN_TEXT.key]: {
          disabledStates: {},
        },
      },
      styles: {
        color: {
          value: 'blue',
        },
      },
    },
  },
};
