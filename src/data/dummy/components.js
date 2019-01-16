// @flow

import type { ComponentModel } from '../component/model';
import type { BlockModel } from '../block/model';
import type { StyleModel } from '../styles/model';
import { STYLE_STATES } from '../styles/model';

export const DUMMY_BLOCK_STYLES: StyleModel = {
  key: 'DUMMY_BLOCK_STYLES',
  mixins: {},
  states: {
    [STYLE_STATES.default]: {
      styles: {
        'font-family': {
          value: 'Gday world!',
        },
      },
    },
  },
};

const DUMMY_BLOCK_COMPONENT: BlockModel = {
  key: 'DUMMY_BLOCK_COMPONENT',
  blockTypeKey: '', // todo
  name: 'Dummy Block',
  styles: {
    stylesKey: DUMMY_BLOCK_STYLES.key,
  },
};

export const DUMMY_TEST_COMPONENT: ComponentModel = {
  key: 'DUMMY_TEST_COMPONENT',
  blocks: {
    [DUMMY_BLOCK_COMPONENT.key]: DUMMY_BLOCK_COMPONENT,
  },
  rootBlockKey: DUMMY_BLOCK_COMPONENT.key,
};
