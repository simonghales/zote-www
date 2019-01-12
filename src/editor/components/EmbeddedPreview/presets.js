// @flow

export type EmbeddedPreviewConfigPreset = {
  key: string,
  label: string,
  width: number,
  height: number,
};

export const EMBEDDED_PREVIEW_CONFIG_PRESETS: {
  [string]: EmbeddedPreviewConfigPreset,
} = {
  largeDesktop: {
    key: 'largeDesktop',
    label: 'Large Desktop',
    width: 1920,
    height: 1080,
  },
};
