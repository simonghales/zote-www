// @flow
import React from 'react';
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignRight,
  FaColumns,
  FaGripHorizontal,
  FaFont,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { IoIosSquare, IoIosSquareOutline } from 'react-icons/io';
import type { RadioInputOptionModel } from './RadioInput';

export const TEXT_ALIGN_OPTIONS: Array<RadioInputOptionModel> = [
  {
    value: 'left',
    label: <FaAlignLeft size={12} />,
  },
  {
    value: 'center',
    label: <FaAlignCenter size={12} />,
  },
  {
    value: 'right',
    label: <FaAlignRight size={12} />,
  },
  {
    value: 'justify',
    label: <FaAlignJustify size={12} />,
  },
];

export const DISPLAY_OPTIONS: Array<RadioInputOptionModel> = [
  {
    value: 'block',
    label: <IoIosSquare size={14} />,
  },
  {
    value: 'flex',
    label: <FaColumns size={12} />,
  },
  {
    value: 'grid',
    label: <FaGripHorizontal size={14} />,
  },
  {
    value: 'inline-block',
    label: <IoIosSquareOutline size={14} />,
  },
  {
    value: 'inline',
    label: <FaFont size={11} />,
  },
  {
    value: 'none',
    label: <FaRegEyeSlash size={12} />,
  },
];
