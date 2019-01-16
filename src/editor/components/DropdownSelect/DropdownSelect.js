// @flow
import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Select from 'react-select';
import styles from './styles';
import colors from '../../../styles/config/colors';

const CustomDropdownIndicator = () => (
  <FaCaretDown size={12} color={colors.darkLightBlue} style={{ display: 'block' }} />
);

export const DROPDOWN_SELECT_THEMES = {
  default: 'default',
  plain: 'plain',
};

type DropdownSelectThemes = $Keys<typeof DROPDOWN_SELECT_THEMES>;

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
    const { options, value, theme } = this.props;
    return (
      <Select
        value={value}
        options={options}
        onChange={this.handleChange}
        styles={theme === DROPDOWN_SELECT_THEMES.plain ? styles.plainStyles : styles.customStyles}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    );
  }
}

export default DropdownSelect;

export const PlainDropdownSelect = (props: Props) => (
  <DropdownSelect {...props} theme={DROPDOWN_SELECT_THEMES.plain} />
);
