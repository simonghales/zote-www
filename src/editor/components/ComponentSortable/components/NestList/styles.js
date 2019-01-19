// @flow

import { css } from 'emotion';

const classNames = {
  selectedBlock: 'selectedBlock',
  nestItemSelected: 'nestItemSelected',
};

const blackBlue = 'red';
const blackInactiveBlue = 'green';
const brightBlue = 'blue';

const containerClass = css`
  max-height: 100%;
  overflow-y: auto;

  .nestable .nestable-list {
    padding-left: 10px;
    position: relative;
  }

  .nestItemSelected {
    .nestable-item {
      background-color: #131723;
    }
  }

  .nestable .nestable-list,
  .nestable-item {
    .${classNames.selectedBlock} & {
      background-color: #131723;
    }
  }

  .nestable-item,
  .nestable-item-copy {
    margin: 0;
  }

  .nestable-item .nestable-list,
  .nestable-item-copy .nestable-list {
    margin: 0;
  }

  .nestable-drag-layer .nestable-item-copy {
    background-color: ${blackBlue};

    .block {
      background-color: ${blackBlue};
    }
  }

  .nestable-drag-layer
    .nestable-item-copy.${classNames.nestItemSelected},
    .nestable-item.is-hovered,
  .${classNames.nestItemSelected} > .nestable-list {
    background-color: ${blackBlue};

    .block {
      background-color: ${blackBlue};
    }
  }

  .${classNames.nestItemSelected} > .nestable-list {
    &::after {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background-color: ${brightBlue};
    }
  }

  .nestable-item.is-dragging:before {
    background-color: ${blackInactiveBlue};
    border: 2px solid ${brightBlue};
  }
`;

export default {
  classNames,
  containerClass,
};
