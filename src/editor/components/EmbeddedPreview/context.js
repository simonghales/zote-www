// @flow
import React from 'react';
import { EMBEDDED_PREVIEW_CONFIG_PRESETS } from './presets';

export type EmbeddedPreviewConfigContextState = {
  preset: string,
  width: number,
  height: number,
  zoom: number,
  setPreset: (preset: string) => void,
  setWidth: (width: number) => void,
  setHeight: (height: number) => void,
  setZoom: (zoom: number) => void,
};

const defaultState: EmbeddedPreviewConfigContextState = {
  preset: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.key,
  width: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.width,
  height: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.height,
  zoom: 50,
  setPreset: () => {},
  setWidth: () => {},
  setHeight: () => {},
  setZoom: () => {},
};

export const EmbeddedPreviewConfigContext = React.createContext(defaultState);
