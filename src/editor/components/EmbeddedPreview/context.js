// @flow
import React from 'react';
import { EMBEDDED_PREVIEW_CONFIG_PRESETS } from './presets';

export const EMBEDDED_PREVIEW_CONFIG_CAUSES = {
  zoom: 'zoom',
  size: 'size',
};

export type EmbeddedPreviewConfigLastCause = null | $Keys<typeof EMBEDDED_PREVIEW_CONFIG_CAUSES>;

export type EmbeddedPreviewConfigContextState = {
  preset: string,
  width: number,
  height: number,
  zoom: number,
  lastCause: EmbeddedPreviewConfigLastCause,
  setPreset: (preset: string) => void,
  setWidth: (width: number, auto?: boolean) => void,
  setHeight: (height: number, auto?: boolean) => void,
  setZoom: (zoom: number, auto?: boolean) => void,
};

const defaultState: EmbeddedPreviewConfigContextState = {
  preset: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.key,
  width: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.width,
  height: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.height,
  zoom: 100,
  lastCause: null,
  setPreset: () => {},
  setWidth: () => {},
  setHeight: () => {},
  setZoom: () => {},
};

export const EmbeddedPreviewConfigContext = React.createContext(defaultState);
