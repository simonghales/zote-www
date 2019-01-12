// @flow

import { css } from 'emotion';
import { getRem } from '../../../../../styles/utils/measurements';
import colors from '../../../../../styles/config/colors';

const containerClass = css`
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: ${getRem(100)};

  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -10px;
    right: -10px;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
  }
`;

const availableSpaceClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const contentWrapperClass = css`
  position: relative;
  //width: 100%;
  //padding-bottom: 56.25%;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${getRem(20)};
    right: ${getRem(20)};
    bottom: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  }
`;

const contentClass = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
`;

export default {
  containerClass,
  availableSpaceClass,
  contentWrapperClass,
  contentClass,
};
