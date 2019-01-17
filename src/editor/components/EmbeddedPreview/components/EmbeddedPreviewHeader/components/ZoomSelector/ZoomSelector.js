// @flow
import React, { Component } from 'react';
import { GenericDropdownSelect } from '../../../../../DropdownSelect/DropdownSelect';
import type { SelectOptionType } from '../../../../../DropdownSelect/DropdownSelect';
import styles from './styles';

const option50 = {
  value: '50',
  label: '50%',
};

const option75 = {
  value: '75',
  label: '75%',
};

const option100 = {
  value: '100',
  label: '100%',
};

const options: Array<SelectOptionType> = [option50, option75, option100];

type Props = {
  zoom: number,
  setZoom: (zoom: number) => void,
};

class ZoomSelector extends Component<Props> {
  getValue(): SelectOptionType {
    const { zoom } = this.props;
    return {
      value: zoom.toString(),
      label: `${Math.round(zoom).toString()}%`,
    };
  }

  handleSetZoom = (option: SelectOptionType) => {
    const { setZoom } = this.props;
    const { value = '' } = option;
    const zoom = parseInt(value, 10);
    setZoom(zoom);
  };

  render() {
    return (
      <div className={styles.containerClass}>
        <GenericDropdownSelect
          options={options}
          value={this.getValue()}
          onChange={this.handleSetZoom}
        />
      </div>
    );
  }
}

export default ZoomSelector;
