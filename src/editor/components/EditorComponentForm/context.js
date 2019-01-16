// @flow
import React from 'react';

export type EditorComponentFormContextState = {
  componentKey: string,
};

const defaultState: EditorComponentFormContextState = {
  componentKey: '',
};

export const EditorComponentFormContext = React.createContext(defaultState);
