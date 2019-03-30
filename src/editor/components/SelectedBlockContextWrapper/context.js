// @flow
import React, { useContext } from 'react';
import type { BlockModel } from '../../../data/block/model';

export const SelectedBlockContext = React.createContext<BlockModel | null>(null);

export function useGetSelectedBlock(): BlockModel {
  return useContext(SelectedBlockContext);
}
