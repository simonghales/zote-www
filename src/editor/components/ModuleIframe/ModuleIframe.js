// @flow
import React from 'react';
import debounceRender from 'react-debounce-render';

type Props = {
  width: number,
  height: number,
};

const getPreviewUrl = (): string => `${window.location.origin}/preview`;

const ModuleIframe = ({ width, height }: Props) => (
  <iframe
    style={{
      width,
      height,
    }}
    src={getPreviewUrl()}
  />
);

export default debounceRender(ModuleIframe, 200, {
  leading: true,
  trailing: true,
});
