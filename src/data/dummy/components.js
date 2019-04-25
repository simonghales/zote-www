// @flow

import type { ComponentModel } from '../component/model';
import type { BlockModel } from '../block/model';
import ContainerBlock from '../block/types/groups/basic/Container';
import { getBlockStyleKeyFormat } from '../block/state';
import ComponentBlock from '../block/types/groups/component/Component';
import ComponentImportBlock from '../block/types/groups/component/ComponentImport';
import HeadingBlock from '../block/types/groups/basic/Heading';
import TextBlock from '../block/types/groups/basic/Text';
import LinkBlock from '../block/types/groups/basic/Link';
import HtmlElementBlock from '../block/types/groups/html/Element';
import RepeaterBlock from '../block/types/groups/functional/Repeater';
import { BLOCK_PROPS_CONFIG_TYPES } from '../block/props/model';
import PageComponentBlock from '../block/types/groups/component/PageComponent';

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

export const DUMMY_LINK_BLOCK: BlockModel = {
  key: 'DUMMY_LINK_BLOCK',
  blockTypeKey: LinkBlock.key,
  name: 'Dummy Link Block',
  props: {
    content: {
      key: 'content',
      value: 'Hello world!',
    },
  },
};

export const DUMMY_HTML_ELEMENT_BLOCK: BlockModel = {
  key: 'DUMMY_HTML_ELEMENT_BLOCK',
  blockTypeKey: HtmlElementBlock.key,
  name: 'Dummy HTML Block',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_LINK_BLOCK.key, DUMMY_TEXT_BLOCK.key],
    },
    content: {
      key: 'content',
      value: 'Testing...',
      linked: {
        blockKey: 'DUMMY_CONTAINER_BLOCK',
        propKey: 'test',
      },
    },
    htmlAttributes: {
      key: 'htmlAttributes',
      value: [
        {
          key: 'class',
          value: 'boop-woop',
        },
      ],
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
      linked: {
        blockKey: 'DUMMY_CONTAINER_BLOCK',
        propKey: 'test',
      },
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
      value: [DUMMY_HEADING_BLOCK.key, DUMMY_HTML_ELEMENT_BLOCK.key],
    },
    test: {
      key: 'test',
      value: 'BOOP WOOP',
    },
  },
  propsConfig: {
    test: {
      key: 'test',
      label: 'Test',
      type: BLOCK_PROPS_CONFIG_TYPES.string,
      customProp: true,
      editable: true,
      linkable: true,
    },
  },
};

const DUMMY_COMPONENT_IMPORT_BLOCK: BlockModel = {
  key: 'DUMMY_COMPONENT_IMPORT_BLOCK',
  blockTypeKey: ComponentImportBlock.key,
  name: 'Testing Import',
  props: {
    componentReference: {
      key: 'componentReference',
      value: 'DUMMY_SECOND_COMPONENT',
    },
    test: {
      key: 'test',
      value: 'banana',
      linked: {
        blockKey: 'DUMMY_REPEATER_BLOCK',
        propKey: 'repeaterData',
        repeaterFieldKey: 'label',
      },
    },
  },
};

const DUMMY_REPEATER_BLOCK: BlockModel = {
  key: 'DUMMY_REPEATER_BLOCK',
  blockTypeKey: RepeaterBlock.key,
  name: 'Test Repeater',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_COMPONENT_IMPORT_BLOCK.key],
    },
    repeaterData: {
      key: 'repeaterData',
      value: {
        model: {
          fields: {
            label: {
              key: 'label',
              label: 'Label',
              type: BLOCK_PROPS_CONFIG_TYPES.string,
            },
            url: {
              key: 'url',
              label: 'URL',
              type: BLOCK_PROPS_CONFIG_TYPES.string,
            },
            abc: {
              key: 'abc',
              label: 'Test',
              type: BLOCK_PROPS_CONFIG_TYPES.string,
            },
          },
        },
        data: {
          order: ['z', '1'],
          items: {
            '1': {
              key: '1',
              values: {
                label: {
                  value: 'Cool Website',
                },
                url: {
                  value: 'hello.world',
                },
              },
            },
            z: {
              key: 'z',
              values: {
                label: {
                  value: 'Something',
                },
                url: {
                  value: 'blah.blah',
                },
              },
            },
          },
        },
      },
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
      value: [DUMMY_CONTAINER_BLOCK.key, DUMMY_REPEATER_BLOCK.key],
    },
    test: {
      key: 'test',
      value: `G'day World!`,
    },
  },
  propsConfig: {
    test: {
      key: 'test',
      type: BLOCK_PROPS_CONFIG_TYPES.string,
      customProp: true,
      editable: true,
      linkable: false,
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
    [DUMMY_LINK_BLOCK.key]: DUMMY_LINK_BLOCK,
    [DUMMY_TEXT_BLOCK.key]: DUMMY_TEXT_BLOCK,
    [DUMMY_HEADING_BLOCK.key]: DUMMY_HEADING_BLOCK,
    [DUMMY_CONTAINER_BLOCK.key]: DUMMY_CONTAINER_BLOCK,
    [DUMMY_HTML_ELEMENT_BLOCK.key]: DUMMY_HTML_ELEMENT_BLOCK,
    [DUMMY_COMPONENT_IMPORT_BLOCK.key]: DUMMY_COMPONENT_IMPORT_BLOCK,
    [DUMMY_REPEATER_BLOCK.key]: DUMMY_REPEATER_BLOCK,
  },
  rootBlockKey: DUMMY_BLOCK.key,
  isReusable: true,
};

const DUMMY_PAGE_COMPONENT_BLOCK: BlockModel = {
  key: 'DUMMY_PAGE_COMPONENT_BLOCK',
  blockTypeKey: PageComponentBlock.key,
  name: 'Page',
  props: {},
};

export const DUMMY_PAGE_COMPONENT: ComponentModel = {
  key: 'DUMMY_PAGE_COMPONENT',
  blocks: {
    [DUMMY_PAGE_COMPONENT_BLOCK.key]: DUMMY_PAGE_COMPONENT_BLOCK,
  },
  rootBlockKey: DUMMY_PAGE_COMPONENT_BLOCK.key,
  isReusable: false,
};

const DUMMY_SECOND_PAGE_COMPONENT_BLOCK: BlockModel = {
  key: 'DUMMY_SECOND_PAGE_COMPONENT_BLOCK',
  blockTypeKey: PageComponentBlock.key,
  name: 'Page',
  props: {},
};

export const DUMMY_SECOND_PAGE_COMPONENT: ComponentModel = {
  key: 'DUMMY_SECOND_PAGE_COMPONENT',
  blocks: {
    [DUMMY_SECOND_PAGE_COMPONENT_BLOCK.key]: DUMMY_SECOND_PAGE_COMPONENT_BLOCK,
  },
  rootBlockKey: DUMMY_SECOND_PAGE_COMPONENT_BLOCK.key,
  isReusable: false,
};

const DUMMY_SECOND_COMPONENT_HEADING: BlockModel = {
  key: 'DUMMY_SECOND_COMPONENT_HEADING',
  blockTypeKey: HeadingBlock.key,
  name: 'Dummy Heading Block',
  props: {
    text: {
      key: 'text',
      value: `G'day there`,
      linked: {
        blockKey: 'DUMMY_SECOND_COMPONENT_BLOCK',
        propKey: 'test',
      },
    },
  },
};

const DUMMY_SECOND_COMPONENT_BLOCK: BlockModel = {
  key: 'DUMMY_SECOND_COMPONENT_BLOCK',
  blockTypeKey: ComponentBlock.key,
  name: 'Second Component',
  props: {
    children: {
      key: 'children',
      value: [DUMMY_SECOND_COMPONENT_HEADING.key],
    },
    test: {
      key: 'test',
      value: 'Boop Woop',
    },
  },
  propsConfig: {
    test: {
      key: 'test',
      label: 'Test',
      type: BLOCK_PROPS_CONFIG_TYPES.string,
      customProp: true,
      editable: true,
      linkable: true,
    },
  },
};

export const DUMMY_SECOND_COMPONENT: ComponentModel = {
  key: 'DUMMY_SECOND_COMPONENT',
  blocks: {
    [DUMMY_SECOND_COMPONENT_HEADING.key]: DUMMY_SECOND_COMPONENT_HEADING,
    [DUMMY_SECOND_COMPONENT_BLOCK.key]: DUMMY_SECOND_COMPONENT_BLOCK,
  },
  rootBlockKey: DUMMY_SECOND_COMPONENT_BLOCK.key,
  isReusable: true,
};
