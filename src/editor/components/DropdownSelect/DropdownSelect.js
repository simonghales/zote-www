// @flow
import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Select from 'react-select';
import type { DropdownSelectThemes } from './styles';
import styles, { DROPDOWN_SELECT_THEMES, getDropdownSelectStyles } from './styles';
import colors from '../../../styles/config/colors';

const CustomDropdownIndicator = () => (
  <FaCaretDown size={12} color={colors.darkLightBlue} style={{ display: 'block' }} />
);

export type SelectOptionType = {
  [string]: any,
};

type Props = {
  // eslint-disable-next-line react/require-default-props
  theme?: DropdownSelectThemes,
  options: Array<SelectOptionType>,
  value: SelectOptionType | null,
  onChange: (option: SelectOptionType) => void,
};

class DropdownSelect extends Component<Props> {
  static defaultProps = {
    theme: DROPDOWN_SELECT_THEMES.default,
  };

  handleChange = (selectedOption: SelectOptionType) => {
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const { options, value, theme = '' } = this.props;
    return (
      <Select
        value={value}
        options={options}
        onChange={this.handleChange}
        styles={getDropdownSelectStyles(theme)}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    );
  }
}

export default DropdownSelect;

export const GenericDropdownSelect = (props: Props) => (
  <DropdownSelect {...props} theme={DROPDOWN_SELECT_THEMES.dropdown} />
);

export const PlainDropdownSelect = (props: Props) => (
  <DropdownSelect {...props} theme={DROPDOWN_SELECT_THEMES.plain} />
);
