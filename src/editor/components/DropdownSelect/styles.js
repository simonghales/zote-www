// @flow

import fontWeights from '../../../styles/config/fontWeights';
import colors from '../../../styles/config/colors';

const customStyles = {};

const plainStyles = {};

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
  return customStyles;
};

export default {
  customStyles,
  plainStyles,
  dropdownStyles,
};
