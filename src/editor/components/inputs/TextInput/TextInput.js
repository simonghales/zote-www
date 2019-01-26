// @flow
import React, { Component } from 'react';
import { PlainInput } from '../../Input/Input';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';

type Props = DefaultFormInputProps & {
  autoFocus?: boolean,
};

type State = {
  value: string,
};

class TextInput extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { updateValue } = this.props;
    const { value } = event.target;
    this.setState({
      value,
    });
    updateValue(value);
  };

  render() {
    const { value } = this.state;
    const { defaultValue, inputId, autoFocus } = this.props;
    return (
      <PlainInput
        value={value || defaultValue}
        onChange={this.handleOnChange}
        inputId={inputId}
        autoFocus={autoFocus}
      />
    );
  }
}

export default TextInput;
