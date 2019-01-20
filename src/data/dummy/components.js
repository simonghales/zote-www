// @flow

import type { ComponentModel } from '../component/model';
import type { BlockModel } from '../block/model';
import type { StyleModel } from '../styles/model';
import { STYLE_STATES } from '../styles/model';
import ContainerBlock from '../block/types/groups/basic/Container';
import { getBlockStyleKeyFormat } from '../block/state';

export const DUMMY_BLOCK_STYLES: StyleModel = {
  key: getBlockStyleKeyFormat('DUMMY_BLOCK'),
  mixins: {},
  states: {
    [STYLE_STATES.default]: {
      styles: {
        'font-family': {
          value: 'Gday world!',
        },
        'text-align': {
          value: 'center',
        },
      },
    },
  },
};

export const DUMMY_TEXT_BLOCK: BlockModel = {
  key: 'DUMMY_TEXT_BLOCK',
  blockTypeKey: ContainerBlock.key, // todo
  name: 'Dummy Text Block',
};

export const DUMMY_BLOCK: BlockModel = {
  key: 'DUMMY_BLOCK',
  blockTypeKey: ContainerBlock.key, // todo
  name: 'Dummy Block',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_TEXT_BLOCK.key],
    },
  },
  styles: {
    stylesKey: getBlockStyleKeyFormat('DUMMY_BLOCK'),
  },
};

export const DUMMY_TEST_COMPONENT: ComponentModel = {
  key: 'DUMMY_TEST_COMPONENT',
  blocks: {
    [DUMMY_BLOCK.key]: DUMMY_BLOCK,
    [DUMMY_TEXT_BLOCK.key]: DUMMY_TEXT_BLOCK,
  },
  rootBlockKey: DUMMY_BLOCK.key,
};
