// @flow
import React, { Component } from 'react';
import { PlainInput } from '../../Input/Input';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';

type Props = DefaultFormInputProps;

type State = {
  value: string,
};

class TextInput extends Component<Props, State> {
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
    const { defaultValue, inputId } = this.props;
    return (
      <PlainInput value={value || defaultValue} onChange={this.handleOnChange} inputId={inputId} />
    );
  }
}

export default TextInput;
