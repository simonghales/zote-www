// @flow
import htmlTags from 'html-tags';
import React, { Component } from 'react';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import { PlainDropdownSelect } from '../../DropdownSelect/DropdownSelect';
import {
  FONT_FAMILY_OPTIONS,
  FONT_STYLE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  PROP_TYPES_OPTIONS,
} from './data';
import type { SelectOptionType } from '../../DropdownSelect/DropdownSelect';

const getSelectInputValue = (values: string): Array<SelectOptionType> | null => {
  if (!values) return null;
  return values
    .split(',')
    .map(value => value.trim())
    .map(value => ({
      value,
      label: value,
    }));
};

const parseSelectOptionsValue = (options: Array<SelectOptionType> | SelectOptionType): string => {
  if (!options) return '';
  if (options instanceof Array) {
    return options.map(option => option.value).join(', ');
  }
  return options.value;
};

type Props = DefaultFormInputProps & {
  isCreatable: boolean,
  isMulti: boolean,
  options: Array<SelectOptionType>,
};

type State = {
  value: string,
};

class SelectInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleOnChange = (newValue: Array<SelectOptionType> | SelectOptionType) => {
    const { updateValue } = this.props;
    const parsedValue = parseSelectOptionsValue(newValue);
    this.setState({
      value: parsedValue,
    });
    updateValue(parsedValue);
  };

  render() {
    const { defaultValue = '', isCreatable, isMulti, options = [] } = this.props;
    const { value } = this.state;
    return (
      <PlainDropdownSelect
        onChange={this.handleOnChange}
        value={getSelectInputValue(value || defaultValue)}
        options={options}
        isCreatable={isCreatable}
        isMulti={isMulti}
      />
    );
  }
}

export default SelectInput;

export const FontFamilyInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable isMulti options={FONT_FAMILY_OPTIONS} />
);

export const FontWeightInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable isMulti={false} options={FONT_WEIGHT_OPTIONS} />
);

export const FontStyleInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable isMulti={false} options={FONT_STYLE_OPTIONS} />
);

const mapHtmlTags = (tags: Array<string>): Array<SelectOptionType> =>
  tags.map((tag: string) => ({
    value: tag,
    label: tag,
  }));

const allHtmlTags = mapHtmlTags(htmlTags);
const headingHtmlTags = mapHtmlTags(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const containerHtmlTags = mapHtmlTags(['div', 'section']);

export const HtmlInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable={false} isMulti={false} options={allHtmlTags} />
);

export const HtmlContainerInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable={false} isMulti={false} options={containerHtmlTags} />
);

export const HtmlHeadingInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable={false} isMulti={false} options={headingHtmlTags} />
);

export const PropTypeInput = (props: DefaultFormInputProps) => (
  <SelectInput {...props} isCreatable={false} isMulti={false} options={PROP_TYPES_OPTIONS} />
);
