// @flow

import type { SelectOptionType } from '../../DropdownSelect/DropdownSelect';
import { BLOCK_PROPS_CONFIG_TYPES } from '../../../../data/block/props/model';

export const FONT_FAMILY_OPTIONS: Array<SelectOptionType> = [
  {
    value: 'sans-serif',
    label: 'sans-serif',
  },
  {
    value: 'serif',
    label: 'serif',
  },
];

export const FONT_WEIGHT_OPTIONS: Array<SelectOptionType> = [
  {
    value: '400',
    label: '400',
  },
  {
    value: '500',
    label: '500',
  },
  {
    value: '700',
    label: '700',
  },
];

export const FONT_STYLE_OPTIONS: Array<SelectOptionType> = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'italic',
    label: 'italic',
  },
];

export const PROP_TYPES_OPTIONS: Array<SelectOptionType> = [
  {
    value: BLOCK_PROPS_CONFIG_TYPES.string,
    label: BLOCK_PROPS_CONFIG_TYPES.string,
  },
];
