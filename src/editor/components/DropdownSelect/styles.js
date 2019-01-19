// @flow

import { darken } from 'polished';
import fontWeights from '../../../styles/config/fontWeights';
import colors from '../../../styles/config/colors';
import { plainInputStyles } from '../../../styles/input';

const classNames = {
  selectDropdownIndicator: 'selectDropdownIndicator',
};

const customStyles = {};

const plainTextStyles = {
  fontFamily: 'Roboto',
  fontSize: plainInputStyles.fontSize,
  fontWeight: fontWeights.medium,
  color: plainInputStyles.color,
};

const plainStyles = {
  indicatorSeparator: (provided: {}, state: any) => ({
    ...provided,
    backgroundColor: darken(0.1, plainInputStyles.backgroundColor),
  }),
  groupHeading: (provided: {}, state: any) => ({
    ...provided,
    fontSize: plainInputStyles.fontSize,
    color: colors.darkLightBlue,
  }),
  noOptionsMessage: (provided: {}, state: any) => ({
    ...provided,
    fontSize: plainInputStyles.fontSize,
    color: colors.darkLightBlue,
  }),
  menu: (provided: {}, state: any) => ({
    ...provided,
    background: colors.white,
    borderRadius: plainInputStyles.borderRadius,
    margin: '5px 0 5px 0',
  }),
  option: (provided: {}, state: any) => ({
    ...provided,
    ...plainTextStyles,
    background: state.isFocused ? colors.lightBlue : '',
    color: state.isFocused ? plainInputStyles.focusBorderColor : plainInputStyles.color,
    ':hover': {
      color: plainInputStyles.focusBorderColor,
    },
    ':active': {
      color: plainInputStyles.focusBorderColor,
    },
  }),
  placeholder: (provided: {}, state: any) => ({
    ...provided,
    ...plainTextStyles,
    color: colors.shadeBlue,
  }),
  input: (provided: {}, state: any) => ({
    ...provided,
    ...plainTextStyles,
    margin: 0,
  }),
  control: (provided: {}, state: any) => ({
    ...provided,
    background: plainInputStyles.backgroundColor,
    borderWidth: 2,
    borderColor: state.isFocused
      ? plainInputStyles.focusBorderColor
      : plainInputStyles.backgroundColor,
    borderRadius: plainInputStyles.borderRadius,
    minHeight: plainInputStyles.minHeight,
    boxShadow: 'none',
    ':hover': {
      borderColor: state.isFocused
        ? plainInputStyles.focusBorderColor
        : plainInputStyles.backgroundColor,
    },
    // minWidth: 60,
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    padding: 0,
    paddingLeft: plainInputStyles.paddingHorizontal,
    paddingRight: plainInputStyles.paddingHorizontal,
  }),
  singleValue: (provided: {}, state: {}) => ({
    ...provided,
    ...plainTextStyles,
  }),
  multiValue: (provided: {}, state: {}) => ({
    ...provided,
    background: colors.white,
  }),
  multiValueLabel: (provided: {}, state: {}) => ({
    ...provided,
    ...plainTextStyles,
  }),
  multiValueRemove: (provided: {}, state: {}) => ({
    ...provided,
    padding: 2,
    color: colors.shadeBlue,
    ':hover': {
      color: plainInputStyles.focusBorderColor,
    },
  }),
  clearIndicator: (provided: {}, state: {}) => ({
    ...provided,
    padding: 2,
    color: colors.shadeBlue,
    ':hover': {
      color: plainInputStyles.focusBorderColor,
    },
    '& svg': {
      width: 14,
      height: 14,
    },
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
    [`& .${classNames.selectDropdownIndicator}`]: {
      padding: '0 2px',
    },
  }),
};

const dropdownStyles = {
  control: (provided: {}, state: {}) => ({
    ...provided,
    background: 'none',
    border: 0,
    borderRadius: 0,
    minHeight: 'auto',
    // minWidth: 60,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  valueContainer: (provided: {}) => ({
    ...provided,
    padding: 0,
    paddingRight: 5,
  }),
  singleValue: (provided: {}, state: {}) => ({
    ...provided,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: fontWeights.bold,
    color: colors.darkBlue,
    margin: 0,
  }),
  input: (provided: {}, state: {}) => ({
    ...provided,
  }),
  indicatorsContainer: (provided: {}) => ({
    ...provided,
  }),
};
export const DROPDOWN_SELECT_THEMES = {
  default: 'default',
  plain: 'plain',
  dropdown: 'dropdown',
};
export type DropdownSelectThemes = $Keys<typeof DROPDOWN_SELECT_THEMES>;

export const getDropdownSelectStyles = (theme: string): {} => {
  if (theme === DROPDOWN_SELECT_THEMES.dropdown) {
    return dropdownStyles;
  }
  if (theme === DROPDOWN_SELECT_THEMES.plain) {
    return plainStyles;
  }
  return customStyles;
};

export default {
  classNames,
  customStyles,
  plainStyles,
  dropdownStyles,
};
