// @flow

import type { ComponentModel } from '../component/model';
import type { BlockModel } from '../block/model';
import type { StyleModel } from '../styles/model';
import { STYLE_STATES } from '../styles/model';
import ContainerBlock from '../block/types/groups/basic/Container';
import { getBlockStyleKeyFormat } from '../block/state';
import ComponentBlock from '../block/types/groups/component/Component';
import HeadingBlock from '../block/types/groups/basic/Heading';
import TextBlock from '../block/types/groups/basic/Text';

export const DUMMY_BLOCK_STYLES: StyleModel = {
  key: getBlockStyleKeyFormat('DUMMY_CONTAINER_BLOCK'),
  mixins: {},
  states: {
    [STYLE_STATES.default]: {
      styles: {
        'font-family': {
          value: 'Roboto',
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
  blockTypeKey: TextBlock.key,
  name: 'Dummy Text Block',
  props: {
    text: {
      key: 'text',
      value: 'Hello world!',
    },
  },
};

export const DUMMY_HEADING_BLOCK: BlockModel = {
  key: 'DUMMY_HEADING_BLOCK',
  blockTypeKey: HeadingBlock.key,
  name: 'Dummy Heading Block',
  props: {
    text: {
      key: 'text',
      value: `G'day there`,
    },
  },
};

export const DUMMY_CONTAINER_BLOCK: BlockModel = {
  key: 'DUMMY_CONTAINER_BLOCK',
  blockTypeKey: ContainerBlock.key,
  name: 'Dummy Container Block',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_HEADING_BLOCK.key, DUMMY_TEXT_BLOCK.key],
    },
  },
};

export const DUMMY_BLOCK: BlockModel = {
  key: 'DUMMY_BLOCK',
  blockTypeKey: ComponentBlock.key,
  name: 'Dummy Block',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_CONTAINER_BLOCK.key],
    },
  },
  styles: {
    stylesKey: getBlockStyleKeyFormat('DUMMY_BLOCK'),
  },
  isRootBlock: true,
};

export const DUMMY_TEST_COMPONENT: ComponentModel = {
  key: 'DUMMY_TEST_COMPONENT',
  blocks: {
    [DUMMY_BLOCK.key]: DUMMY_BLOCK,
    [DUMMY_TEXT_BLOCK.key]: DUMMY_TEXT_BLOCK,
    [DUMMY_HEADING_BLOCK.key]: DUMMY_HEADING_BLOCK,
    [DUMMY_CONTAINER_BLOCK.key]: DUMMY_CONTAINER_BLOCK,
  },
  rootBlockKey: DUMMY_BLOCK.key,
};
