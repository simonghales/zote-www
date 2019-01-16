// @flow
import React from 'react';

export type EditorComponentFormContextState = {
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
};

const defaultState: EditorComponentFormContextState = {
  componentKey: '',
  blockKey: '',
  blockStyleKey: '',
};

export const EditorComponentFormContext = React.createContext(defaultState);
