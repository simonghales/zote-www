// @flow
import React, { useContext } from 'react';
import type { ComponentModel } from '../../../data/component/model';

export const SelectedComponentContext = React.createContext<ComponentModel | null>(null);

export function useGetSelectedComponent(): ComponentModel {
  return useContext(SelectedComponentContext);
}
