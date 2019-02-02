// @flow
import React from 'react';
import type { FormInputProps } from '../../props';
import { getFormInputId } from '../../FormInput';
import FormInputBody from '../FormInputBody/FormInputBody';
import FormInputHeader from '../FormInputHeader/FormInputHeader';
import DropdownMenu from '../../../../../DropdownMenu/DropdownMenu';
import { MENU_LAYOUTS } from '../../../../../Menu/Menu';
import StyleFormInputOptions from './components/StyleFormInputOptions/StyleFormInputOptions';

type State = {
  dropDownVisible: boolean,
};

type Props = FormInputProps & {
  blockStyleKey: string,
  styleStateKey: string,
};

class StyleFormInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dropDownVisible: false,
    };
  }

  handleDisplayDropdown = () => {
    this.setState({
      dropDownVisible: true,
    });
  };

  handleHideDropdown = () => {
    this.setState({
      dropDownVisible: false,
    });
  };

  render() {
    const {
      inputKey,
      name,
      inactive = false,
      defaultValue,
      value,
      updateValue,
      inputType,
      blockStyleKey,
      styleStateKey,
    } = this.props;
    const inputId = getFormInputId(inputKey);
    return (
      <div>
        <FormInputHeader
          displayDropdown={this.handleDisplayDropdown}
          inactive={inactive}
          inputId={inputId}
          name={name}
        >
          <DropdownMenu layout={MENU_LAYOUTS.fixed} close={this.handleHideDropdown}>
            <StyleFormInputOptions
              styleKey={blockStyleKey}
              styleStateKey={styleStateKey}
              styleValueKey={inputKey}
            />
          </DropdownMenu>
        </FormInputHeader>
        <FormInputBody
          updateValue={updateValue}
          value={value}
          defaultValue={defaultValue}
          inputType={inputType}
          inputId={inputId}
        />
      </div>
    );
  }
}

export default StyleFormInput;
