// @flow
import React, { Component } from 'react';
import styles from './styles';
import ModuleIframe from '../ModuleIframe/ModuleIframe';
import {
  PREVIEW_CONTENT_UPDATE_EVENT,
  PREVIEW_IFRAME_BROADCAST_INIT,
  PREVIEW_TAB_POLL_RECEIVED_EVENT,
} from '../../../preview/event';

type Props = {
  width: number,
  height: number,
  zoom: number,
  data: any,
  hoveredBlockKey: string,
};

type State = {
  iframeInit: boolean,
  openedPreviewInTab: boolean,
};

class ModuleIframeWrapper extends Component<Props, State> {
  moduleIframeRef: {
    current: ModuleIframe | null,
  };

  previewTabPollInterval: IntervalID;

  previewTabReference: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      iframeInit: false,
      openedPreviewInTab: false,
    };
    this.moduleIframeRef = React.createRef();
  }

  componentDidMount() {
    this.addIframeListener();
    this.updateIframeData();
    // this.updateHoveredBlockKey();
  }

  componentWillUnmount() {
    this.removeIframeListener();
  }

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line react/destructuring-assignment
    // if (prevProps.hoveredBlockKey !== this.props.hoveredBlockKey) {
    //   this.updateHoveredBlockKey();
    // }
    this.updateIframeData();
  }

  addIframeListener() {
    window.addEventListener('message', this.handlePreviewIframeBroadcast);
  }

  removeIframeListener() {
    window.removeEventListener('message', this.handlePreviewIframeBroadcast);
  }

  handlePreviewIframeBroadcast = (event: any) => {
    const { data } = event;
    if (data === PREVIEW_IFRAME_BROADCAST_INIT) {
      this.setState({
        iframeInit: true,
      });
      this.updateIframeData();
    } else if (data === PREVIEW_TAB_POLL_RECEIVED_EVENT) {
      this.handlePreviewTabPollReceivedEvent();
    }
  };

  getIframe(): null | HTMLIFrameElement {
    const { iframeInit } = this.state;
    if (!iframeInit) return null;
    const moduleIframe = this.moduleIframeRef.current;
    if (!moduleIframe) return null;
    const iframe = moduleIframe.iframeRef.current;
    if (!iframe) return null;
    return iframe;
  }

  handlePreviewTabPollReceivedEvent = () => {
    clearInterval(this.previewTabPollInterval);
    this.updateIframeData();
  };

  updateIframeData() {
    const iframe = this.getIframe();
    if (!iframe) return;
    const { data, hoveredBlockKey } = this.props;
    const dispatchEvent = new CustomEvent(PREVIEW_CONTENT_UPDATE_EVENT, {
      detail: {
        data,
        hoveredBlockKey,
      },
    });
    iframe.contentWindow.dispatchEvent(dispatchEvent);
    if (this.previewTabReference) {
      this.previewTabReference.dispatchEvent(dispatchEvent);
    }
  }

  render() {
    const { width, height, zoom } = this.props;
    return (
      <div className={styles.containerClass}>
        <div
          className={styles.iframeContainerClass}
          style={{
            width,
            height,
            transform: `scale(${zoom / 100})`,
          }}
        >
          <ModuleIframe width={width} height={height} ref={this.moduleIframeRef} />
        </div>
      </div>
    );
  }
}

export default ModuleIframeWrapper;
