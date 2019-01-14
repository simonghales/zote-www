// @flow
import React, { Component } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import ContainerDimensions from 'react-container-dimensions';
import styles from './styles';
import ModuleIframe from '../../../ModuleIframe/ModuleIframe';
import { EMBEDDED_PREVIEW_CONFIG_CAUSES, EmbeddedPreviewConfigContext } from '../../context';
import type { EmbeddedPreviewConfigLastCause } from '../../context';

function calculateRatio(
  availableHeight: number,
  availableWidth: number,
  desiredWidth: number,
  desiredHeight: number
): number {
  let ratio = [availableWidth / desiredWidth, availableHeight / desiredHeight];
  ratio = Math.min(ratio[0], ratio[1]);
  return ratio;
}

function calculateBoxFit(
  availableHeight: number,
  availableWidth: number,
  desiredWidth: number,
  desiredHeight: number
): [number, number] {
  const ratio = calculateRatio(availableHeight, availableWidth, desiredWidth, desiredHeight);
  return [desiredWidth * ratio, desiredHeight * ratio];
}

function getBoxDimensions(
  availableHeight: number,
  availableWidth: number,
  desiredWidth: number,
  desiredHeight: number,
  desiredZoom: number
): [number, number] {
  const desiredZoomWidth = desiredWidth * (desiredZoom / 100);
  const desiredZoomHeight = desiredHeight * (desiredZoom / 100);
  if (desiredZoomWidth <= availableWidth && desiredZoomHeight <= availableHeight) {
    return [desiredZoomWidth, desiredZoomHeight];
  }
  if (desiredWidth <= availableWidth && desiredHeight <= availableHeight) {
    return [desiredWidth, desiredHeight];
  }

  return calculateBoxFit(availableHeight, availableWidth, desiredWidth, desiredHeight);
}

function doesBoxFitZoomWithinParent(
  availableHeight: number,
  availableWidth: number,
  desiredWidth: number,
  desiredHeight: number,
  desiredZoom: number
): boolean {
  const desiredZoomWidth = desiredWidth * (desiredZoom / 100);
  const desiredZoomHeight = desiredHeight * (desiredZoom / 100);
  if (desiredZoomWidth <= availableWidth && desiredZoomHeight <= availableHeight) {
    return true;
  }
  if (desiredWidth <= availableWidth && desiredHeight <= availableHeight) {
    return true;
  }
  return false;
}

type Props = {
  desiredWidth: number,
  desiredHeight: number,
  desiredZoom: number,
  availableWidth: number,
  availableHeight: number,
  // eslint-disable-next-line react/no-unused-prop-types
  lastCause: EmbeddedPreviewConfigLastCause,
  onResize: (width: number, height: number) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  setDimensions: (width: number, height: number) => void,
  // eslint-disable-next-line react/no-unused-prop-types
  setZoom: (zoom: number) => void,
};

class EmbeddedPreviewBodyContent extends Component<Props> {
  componentDidMount(): void {
    this.calculateZoom(this.props);
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps: $ReadOnly<Props>, nextContext: any): void {
    this.calculateZoom(nextProps);
  }

  calculateZoom(props: $ReadOnly<Props>) {
    const { availableHeight, availableWidth, desiredWidth, desiredHeight, desiredZoom } = props;
    const itFits = doesBoxFitZoomWithinParent(
      availableHeight,
      availableWidth,
      desiredWidth,
      desiredHeight,
      desiredZoom
    );
    if (itFits) return;

    const { lastCause, setDimensions } = props;

    if (lastCause === EMBEDDED_PREVIEW_CONFIG_CAUSES.zoom) {
      const [newWidth, newHeight] = calculateBoxFit(
        availableHeight,
        availableWidth,
        desiredWidth,
        desiredHeight
      );
      setDimensions(newWidth, newHeight);
    } else {
      const calculatedZoom =
        calculateRatio(availableHeight, availableWidth, desiredWidth, desiredHeight) * 100;
      if (desiredZoom !== calculatedZoom) {
        const { setZoom } = props;
        setZoom(calculatedZoom);
      }
    }
  }

  getBoxDimensions(): [number, number] {
    const {
      availableHeight,
      availableWidth,
      desiredWidth,
      desiredHeight,
      desiredZoom,
    } = this.props;
    return getBoxDimensions(
      availableHeight,
      availableWidth,
      desiredWidth,
      desiredHeight,
      desiredZoom
    );
  }

  handleResize = (
    event: SyntheticEvent<any>,
    data: {
      size: {
        height: number,
        width: number,
      },
    }
  ) => {
    const { desiredZoom, onResize } = this.props;
    const {
      size: { height, width },
    } = data;
    const updatedWidth = width / (desiredZoom / 100);
    const updatedHeight = height / (desiredZoom / 100);
    onResize(updatedWidth, updatedHeight);
  };

  render() {
    const {
      availableWidth,
      availableHeight,
      desiredWidth,
      desiredHeight,
      desiredZoom,
    } = this.props;
    const [width, height] = this.getBoxDimensions();
    return (
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[100, 100]}
        maxConstraints={[availableWidth, availableHeight]}
        onResize={this.handleResize}
      >
        <div className={styles.contentWrapperClass}>
          <div className={styles.contentClass}>
            <ModuleIframe width={desiredWidth} height={desiredHeight} zoom={desiredZoom} />
          </div>
        </div>
      </ResizableBox>
    );
  }
}

const EmbeddedPreviewBody = () => (
  <EmbeddedPreviewConfigContext.Consumer>
    {({
      width: desiredWidth,
      height: desiredHeight,
      zoom: desiredZoom,
      setWidth,
      setHeight,
      setZoom,
      lastCause,
    }) => (
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
                onResize={(newWidth, newHeight) => {
                  setWidth(newWidth);
                  setHeight(newHeight);
                }}
                setZoom={(zoom: number) => setZoom(zoom, true)}
                setDimensions={(newWidth, newHeight) => {
                  setWidth(newWidth, true);
                  setHeight(newHeight, true);
                }}
                lastCause={lastCause}
              />
            )}
          </ContainerDimensions>
        </div>
      </div>
    )}
  </EmbeddedPreviewConfigContext.Consumer>
);

export default EmbeddedPreviewBody;
