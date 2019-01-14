// @flow
import React from 'react';
import styles from './styles';
import ModuleIframe from '../ModuleIframe/ModuleIframe';

type Props = {
  width: number,
  height: number,
  zoom: number,
};

const ModuleIframeWrapper = ({ width, height, zoom }: Props) => (
  <div className={styles.containerClass}>
    <div
      className={styles.iframeContainerClass}
      style={{
        width,
        height,
        transform: `scale(${zoom / 100})`,
      }}
    >
      <ModuleIframe width={width} height={height} />
    </div>
  </div>
);

export default ModuleIframeWrapper;
