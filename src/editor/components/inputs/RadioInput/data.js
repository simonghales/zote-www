// @flow
import React from 'react';
import { FaAlignLeft, FaAlignCenter, FaAlignJustify, FaAlignRight } from 'react-icons/fa';
import type { RadioInputOptionModel } from './RadioInput';

export const TEXT_ALIGN_OPTIONS: Array<RadioInputOptionModel> = [
  {
    value: 'left',
    label: <FaAlignLeft />,
  },
  {
    value: 'center',
    label: <FaAlignCenter />,
  },
  {
    value: 'right',
    label: <FaAlignRight />,
  },
  {
    value: 'justify',
    label: <FaAlignJustify />,
  },
];
