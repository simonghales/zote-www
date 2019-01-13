// @flow
import React, { Component } from 'react';
import { PlainDropdownSelect } from '../../../../../DropdownSelect/DropdownSelect';
import type { SelectOptionType } from '../../../../../DropdownSelect/DropdownSelect';
import { EMBEDDED_PREVIEW_CONFIG_PRESETS, getPresetDimensions } from '../../../../presets';
import type { EmbeddedPreviewConfigPreset } from '../../../../presets';
import styles from './styles';

const deviceOptions = [EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop];

const options: Array<SelectOptionType> = deviceOptions.map(
  (device: EmbeddedPreviewConfigPreset) => ({
    value: device.key,
    label: device.label,
  })
);

type Props = {
  width: number,
  height: number,
  preset: string,
  setPreset: (preset: string) => void,
};

class DeviceSelector extends Component<Props> {
  getValue(): SelectOptionType {
    const { preset, width, height } = this.props;
    const matchedOption = options.find((option: SelectOptionType) => {
      const dimensions = getPresetDimensions(option.value);
      return (
        option.value === preset && dimensions && dimensions[0] === width && dimensions[1] === height
      );
    });
    if (matchedOption) return matchedOption;
    return {
      value: '',
      label: 'Custom',
    };
  }

  handleSetPreset = (option: SelectOptionType) => {
    const { setPreset } = this.props;
    setPreset(option.value);
  };

  render() {
    return (
      <div className={styles.containerClass}>
        <PlainDropdownSelect
          options={options}
          value={this.getValue()}
          onChange={this.handleSetPreset}
        />
      </div>
    );
  }
}

export default DeviceSelector;
