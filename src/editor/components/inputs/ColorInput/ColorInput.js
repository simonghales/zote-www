// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import ColorMenu from './components/ColorMenu/ColorMenu';
import styles from './styles';
import type { DefaultFormInputProps } from '../../EditorComponentForm/components/FormInput/FormInput';

export const getRgbValue = ({
  r,
  g,
  b,
  a,
}: {
  r: number,
  g: number,
  b: number,
  a: number,
}): string => `rgba(${r},${g},${b},${a})`;

type Props = DefaultFormInputProps & {};

type State = {
  color: string,
  selectingColor: boolean,
};

class ColorInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: props.value ? props.value : '',
      selectingColor: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps: $ReadOnly<Props>, nextContext: any): void {
    const { value } = nextProps;
    const { color: stateValue } = this.state;
    if (value !== stateValue) {
      this.setState({
        color: value,
      });
    }
  }

  getDisplayColor() {
    const { color } = this.state;
    const { defaultValue } = this.props;
    return color || defaultValue;
  }

  handleColorChange = (update: any) => {
    const color = update.rgb.a < 1 ? getRgbValue(update.rgb) : update.hex;
    this.setState({
      color,
    });
    const { updateValue } = this.props;
    updateValue(color);
  };

  handleStartSelectingColor = () => {
    this.setState({
      selectingColor: true,
    });
  };

  handleCloseColorMenu = () => {
    this.setState({
      selectingColor: false,
    });
  };

  render() {
    const displayColor = this.getDisplayColor();
    const { selectingColor } = this.state;
    return (
      <div className={styles.wrapperClass}>
        <div
          className={cx(styles.containerClass, {
            [styles.focusedContainerClass]: selectingColor,
          })}
          onClick={this.handleStartSelectingColor}
        >
          <div
            className={styles.colorFillClass}
            style={{
              backgroundColor: displayColor,
            }}
          />
        </div>
        <div className={styles.menuClass}>
          {selectingColor && (
            <ColorMenu
              color={displayColor}
              onChange={this.handleColorChange}
              close={this.handleCloseColorMenu}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ColorInput;
