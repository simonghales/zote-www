// @flow
import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import ContainerDimensions from 'react-container-dimensions';
import styles from './styles';
import ModuleIframe from '../../../ModuleIframe/ModuleIframe';
import { EmbeddedPreviewConfigContext } from '../../context';

type Props = {
  desiredWidth: number,
  desiredHeight: number,
  desiredZoom: number,
  availableWidth: number,
  availableHeight: number,
};

class EmbeddedPreviewBodyContent extends Component<Props> {
  calculateZoom() {}

  render() {
    return (
      <ResizableBox
        width={1920}
        height={1080}
        minConstraints={[100, 100]}
        maxConstraints={[300, 300]}
      >
        <div className={styles.contentWrapperClass}>
          <div className={styles.contentClass}>
            <ModuleIframe />
          </div>
        </div>
      </ResizableBox>
    );
  }
}

const EmbeddedPreviewBody = () => (
  <EmbeddedPreviewConfigContext.Consumer>
    {({ width: desiredWidth, height: desiredHeight, zoom: desiredZoom }) => (
      <div className={styles.containerClass}>
        <div className={styles.availableSpaceClass}>
          <ContainerDimensions>
            {({ width, height }) => (
              <EmbeddedPreviewBodyContent
                availableWidth={width}
                availableHeight={height}
                desiredHeight={desiredHeight}
                desiredWidth={desiredWidth}
                desiredZoom={desiredZoom}
              />
            )}
          </ContainerDimensions>
        </div>
      </div>
    )}
  </EmbeddedPreviewConfigContext.Consumer>
);

export default EmbeddedPreviewBody;
