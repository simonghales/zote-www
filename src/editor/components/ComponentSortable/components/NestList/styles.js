// @flow

import { css } from 'emotion';
import { darken } from 'polished';
import colors from '../../../../../styles/config/colors';
import { plainInputStyles } from '../../../../../styles/input';
import { blockItemClassNames } from '../BlockItem/styles';

export const nestListClassNames = {
  selectedBlock: 'selectedBlock',
  nestItemSelected: 'nestItemSelected',
};

const blackBlue = colors.lightBlueDarkened;
// const blackBlue = 'red';
const blackInactiveBlue = darken(0.05, blackBlue);
const brightBlue = plainInputStyles.focusBorderColor;

const containerClass = css`
  max-height: 100%;
  overflow-y: auto;

  .nestable .nestable-list {
    padding-left: 10px;
    position: relative;
  }

  .nestItemSelected {
    .nestable-item {
      background-color: ${blackBlue};
    }
  }

  .nestable .nestable-list,
  .nestable-item {
    .${blockItemClassNames.blockItemWrapperSelected} & {
      //background-color: purple;
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
    .nestable-item-copy.${nestListClassNames.nestItemSelected},
    .nestable-item.is-hovered,
  .${nestListClassNames.nestItemSelected} > .nestable-list {
    background-color: ${blackBlue};

    .block {
      background-color: ${blackBlue};
    }
  }

  .${nestListClassNames.nestItemSelected} > .nestable-list {
    // &::after {
    //   content: '';
    //   pointer-events: none;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   width: 3px;
    //   background-color: ${brightBlue};
    // }
  }

  .nestable-item.is-dragging:before {
    background-color: ${blackInactiveBlue};
    border: 2px solid ${brightBlue};
  }
`;

export default {
  classNames: nestListClassNames,
  containerClass,
};
