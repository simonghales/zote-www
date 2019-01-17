// @flow
import React from 'react';
import { STYLE_STATES } from '../../../data/styles/model';

export type EditorComponentFormContextState = {
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
  styleStateKey: string,
};

const defaultState: EditorComponentFormContextState = {
  componentKey: '',
  blockKey: '',
  blockStyleKey: '',
  styleStateKey: STYLE_STATES.default,
};

export const EditorComponentFormContext = React.createContext(defaultState);
