// @flow
import React, { Component } from 'react';
import {
  PREVIEW_CONTENT_UPDATE_EVENT,
  PREVIEW_HOVERED_BLOCK_UPDATE_EVENT,
  PREVIEW_IFRAME_BROADCAST_INIT,
  PREVIEW_TAB_POLL_EVENT,
  PREVIEW_TAB_POLL_RECEIVED_EVENT,
} from '../../event';
import type { MappedBlockModel } from '../../data/block/model';
import ModulePreview from '../../components/ModulePreview/ModulePreview';

type Props = {};

type State = {
  data: Array<MappedBlockModel> | null,
  hoveredBlockKey: string,
};

class PreviewView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      hoveredBlockKey: '',
    };
  }

  componentDidMount() {
    this.listenForMessages();
    this.listenForContentUpdateEvents();
    this.updateParentWindow();
  }

  componentWillUnmount() {
    window.removeEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
    window.removeEventListener(
      PREVIEW_HOVERED_BLOCK_UPDATE_EVENT,
      this.handleHoveredBlockUpdateEvent
    );
  }

  listenForMessages() {
    window.addEventListener('message', this.handleReceivedMessage, false);
  }

  handleReceivedMessage = (event: any) => {
    const { data } = event;
    if (data === PREVIEW_TAB_POLL_EVENT) {
      this.handlePreviewTabPollEvent(event);
    }
  };

  listenForContentUpdateEvents() {
    window.addEventListener(PREVIEW_CONTENT_UPDATE_EVENT, this.handleContentUpdateEvent);
    window.addEventListener(PREVIEW_HOVERED_BLOCK_UPDATE_EVENT, this.handleHoveredBlockUpdateEvent);
  }

  handlePreviewTabPollEvent = (event: any) => {
    event.source.postMessage(PREVIEW_TAB_POLL_RECEIVED_EVENT, '*');
  };

  handleHoveredBlockUpdateEvent = (event: any) => {
    const { detail } = event;
    if (!detail && detail !== '') {
      console.warn(`No detail provided`);
      return;
    }
    this.setState({
      hoveredBlockKey: detail,
    });
  };

  handleContentUpdateEvent = (event: any) => {
    const { detail } = event;
    if (!detail) {
      console.warn(`No detail provided`);
      return;
    }
    console.log('handleContentUpdateEvent', detail);
    this.setState({
      data: detail,
    });
  };

  updateParentWindow() {
    window.parent.postMessage(PREVIEW_IFRAME_BROADCAST_INIT, '*');
  }

  render() {
    const { data, hoveredBlockKey } = this.state;
    if (!data) return null;
    return <ModulePreview data={data} />;
  }
}

export default PreviewView;
