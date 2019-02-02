// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { cx } from 'emotion';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';
import styles from './styles';
import { TEXT_ALIGN_OPTIONS } from './data';
import { buttonize } from '../../../../utils/form';

export type RadioInputOptionModel = {
  value: string,
  label: Node,
};

type Props = DefaultFormInputProps & {
  options: Array<any>,
};

type State = {
  value: string,
};

class RadioInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps: $ReadOnly<Props>, nextContext: any): void {
    const { value } = nextProps;
    const { value: stateValue } = this.state;
    if (value !== stateValue) {
      this.setState({
        value,
      });
    }
  }

  handleSelect = (newValue: string) => {
    const { value } = this.state;
    const updatedValue = value === newValue ? '' : newValue;
    this.handleUpdateValue(updatedValue);
  };

  handleUpdateValue = (newValue: string) => {
    const { updateValue } = this.props;
    this.setState({
      value: newValue,
    });
    updateValue(newValue);
  };

  getSelectedValue() {
    const { defaultValue } = this.props;
    const { value } = this.state;
    return value || defaultValue;
  }

  render() {
    const { options } = this.props;
    const selectedValue = this.getSelectedValue();
    return (
      <div
        className={styles.containerClass}
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        }}
      >
        {options.map(option => {
          const handleSelect = () => this.handleSelect(option.value);
          const selected = option.value === selectedValue;
          return (
            <div
              {...buttonize(handleSelect)}
              className={cx(styles.optionClass, {
                [styles.selectedOptionClass]: selected,
              })}
              key={option.value}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default RadioInput;

export const TextAlignInput = (props: DefaultFormInputProps) => (
  <RadioInput {...props} options={TEXT_ALIGN_OPTIONS} />
);
