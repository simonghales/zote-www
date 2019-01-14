// @flow
import React from 'react';
import styles from './styles';

type Props = {
  width: number,
  height: number,
  zoom: number,
};

const ModuleIframe = ({ width, height, zoom }: Props) => (
  <div className={styles.containerClass}>
    <div
      className={styles.iframeClass}
      style={{
        width,
        height,
        transform: `scale(${zoom / 100})`
      }}
    >
      iframe...
    </div>
  </div>
);

export default ModuleIframe;
