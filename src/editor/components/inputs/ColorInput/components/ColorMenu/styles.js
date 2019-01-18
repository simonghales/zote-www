// @flow
import { css } from 'emotion';
import colors from 'styles/config/colors';

const lightMid = 'blue';
const backgroundColor = 'blue';
const backgroundHoverColor = 'blue';
const borderFocusedColor = 'blue';
const color = 'blue';

const chromePickerClass = css`
  width: 100% !important;
  // background-color: #1c2433 !important;
  //
  // span {
  //   color: ${lightMid} !important;
  // }
  //
  // svg {
  //   path {
  //     fill: ${lightMid} !important;
  //   }
  //
  //   &:hover {
  //     background-color: #2b374d !important;
  //   }
  // }
  //
  // input {
  //   background-color: ${backgroundColor} !important;
  //   box-shadow: ${backgroundColor} 0px 0px 0px 1px inset !important;
  //   color: ${color} !important;
  //
  //   &:focus,
  //   &:hover {
  //     background-color: ${backgroundHoverColor} !important;
  //     box-shadow: ${backgroundHoverColor} 0px 0px 0px 1px inset !important;
  //   }
  //
  //   &:focus {
  //     box-shadow: ${borderFocusedColor} 0px 0px 0px 1px inset !important;
  //   }
  // }
`;

export default {
  chromePickerClass,
};
