// @flow
import { transparentize, darken } from 'polished';

const white = '#FFFFFF';
const darkBlue = '#3C5071';
const darkLightBlue = '#6E85AB';
const shadeBlue = '#8498BA';
const lightFaintShade = '#D3D8EA';
const lightishBlue = '#E9EBF2';
const lightBlue = '#EFF2F8';
const lightBlueDarkened = '#E6EBF4';
const inputShade = '#DEE2F0';
const inputShadeFocused = darken(0.05, inputShade);
const richBlue = '#3640FF';
const focusColor = '#ff7e00';

const siteBackground = lightBlue;
const sidebarBackground = white;
const darkText = darkBlue;
const vibrant = richBlue;

export default {
  white,
  darkBlue,
  darkLightBlue,
  darkText,
  shadeBlue,
  lightishBlue,
  lightBlue,
  lightBlueDarkened,
  lightFaintShade,
  richBlue,
  siteBackground,
  sidebarBackground,
  vibrant,
  inputShade,
  inputShadeFocused,
  focusColor,
};
