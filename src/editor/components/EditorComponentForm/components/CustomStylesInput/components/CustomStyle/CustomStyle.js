// @flow
import React from 'react';
import AutosizeInput from 'react-input-autosize';
import styles from './styles';

type Props = {
  cssKey: string,
  value: string,
  removeCustomStyle: () => void,
  updateCustomStyle: (cssKey: string, value: string) => void,
  focusOnMount?: boolean,
  newCustomStyle?: boolean,
};

type State = {
  keyInputValue: string,
  valueInputValue: string,
};

class CustomStyle extends React.Component<Props, State> {
  static defaultProps = {
    focusOnMount: false,
    newCustomStyle: false,
  };

  keyInputRef: {
    current: any,
  };

  valueInputRef: {
    current: any,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      keyInputValue: props.cssKey,
      valueInputValue: props.value,
    };
    this.keyInputRef = React.createRef();
    this.valueInputRef = React.createRef();
  }

  componentWillReceiveProps(nextProps: $ReadOnly<Props>, nextContext: any): void {
    const { value } = nextProps;
    const { valueInputValue } = this.state;
    if (value !== valueInputValue) {
      this.setState({
        valueInputValue: value,
      });
    }
  }

  handleUpdateKey = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      keyInputValue: value,
    });
  };

  handleUpdateValue = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      valueInputValue: value,
    });
  };

  handleValueUpdateFinished = () => {
    const { keyInputValue, valueInputValue } = this.state;
    const { removeCustomStyle, updateCustomStyle } = this.props;
    if (!valueInputValue || !keyInputValue) {
      removeCustomStyle();
    } else {
      updateCustomStyle(keyInputValue, valueInputValue);
    }
    this.blurInputs();
  };

  handleKeyUpdateFinished = () => {
    const { keyInputValue, valueInputValue } = this.state;
    const { removeCustomStyle, updateCustomStyle } = this.props;
    if (!keyInputValue) {
      removeCustomStyle();
    } else {
      updateCustomStyle(keyInputValue, valueInputValue);
    }
    this.blurInputs();
  };

  handleValuePress = (event: any) => {
    if (event.keyCode === 13) {
      this.handleValueUpdateFinished();
    }
  };

  handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      this.handleKeyUpdateFinished();
    }
  };

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    this.handleValueUpdateFinished();
  };

  blurInputs = () => {
    if (this.keyInputRef.current) {
      this.keyInputRef.current.input.blur();
    }
    if (this.valueInputRef.current) {
      this.valueInputRef.current.input.blur();
    }
  };

  render() {
    const { keyInputValue, valueInputValue } = this.state;
    const { focusOnMount } = this.props;
    return (
      <form className={styles.containerClass} onSubmit={this.handleFormSubmit}>
        <div className={styles.labelClass}>
          <AutosizeInput
            value={keyInputValue}
            onChange={this.handleUpdateKey}
            onBlur={this.handleKeyUpdateFinished}
            onKeyDown={this.handleKeyPress}
            ref={this.keyInputRef}
            autoFocus={focusOnMount}
          />
          <span>:</span>
        </div>
        <div className={styles.valueClass}>
          <AutosizeInput
            value={valueInputValue}
            onChange={this.handleUpdateValue}
            onBlur={this.handleValueUpdateFinished}
            onKeyDown={this.handleValuePress}
            ref={this.valueInputRef}
          />
          <span>;</span>
        </div>
      </form>
    );
  }
}

export default CustomStyle;
