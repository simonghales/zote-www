// @flow
import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import type { DropdownSelectThemes } from './styles';
import styles, { DROPDOWN_SELECT_THEMES, getDropdownSelectStyles } from './styles';
import colors from '../../../styles/config/colors';

function formatCreateLabel(inputValue: string): string {
  return `Add "${inputValue}"`;
}

const CustomDropdownIndicator = () => (
  <div className={styles.classNames.selectDropdownIndicator}>
    <FaCaretDown size={12} color={colors.darkLightBlue} style={{ display: 'block' }} />
  </div>
);

export type SelectOptionType = {
  [string]: any,
};

type Props = {
  // eslint-disable-next-line react/require-default-props
  theme?: DropdownSelectThemes,
  options: Array<SelectOptionType>,
  value: SelectOptionType | Array<SelectOptionType> | null,
  onChange: (option: SelectOptionType) => void,
  // eslint-disable-next-line react/require-default-props,react/require-default-props
  isCreatable?: boolean,
  isMulti?: boolean,
};

class DropdownSelect extends Component<Props> {
  static defaultProps = {
    theme: DROPDOWN_SELECT_THEMES.default,
    isCreatable: false,
    isMulti: false,
  };

  handleChange = (selectedOption: SelectOptionType) => {
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const { options, value, theme = '', isCreatable, isMulti } = this.props;
    const sharedProps = {
      value,
      options,
      onChange: this.handleChange,
      styles: getDropdownSelectStyles(theme),
      components: {
        DropdownIndicator: CustomDropdownIndicator,
      },
      isMulti,
    };
    if (isCreatable) {
      return <CreatableSelect {...sharedProps} formatCreateLabel={formatCreateLabel} />;
    }
    return <Select {...sharedProps} />;
  }
}

export default DropdownSelect;

export const GenericDropdownSelect = (props: Props) => (
  <DropdownSelect {...props} theme={DROPDOWN_SELECT_THEMES.dropdown} />
);

export const PlainDropdownSelect = (props: Props) => (
  <DropdownSelect {...props} theme={DROPDOWN_SELECT_THEMES.plain} />
);
