// @flow

import React from 'react';

export type PreviewViewContextState = {
  hoveredBlockKey: string,
};

export const PreviewViewContext = React.createContext<PreviewViewContextState>({
  hoveredBlockKey: '',
});
