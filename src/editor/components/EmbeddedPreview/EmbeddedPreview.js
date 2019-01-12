// @flow
import React, { Component } from 'react';
import styles from './styles';
import EmbeddedPreviewHeader from './components/EmbeddedPreviewHeader/EmbeddedPreviewHeader';
import EmbeddedPreviewBody from './components/EmbeddedPreviewBody/EmbeddedPreviewBody';
import { EmbeddedPreviewConfigContext } from './context';
import { EMBEDDED_PREVIEW_CONFIG_PRESETS } from './presets';

type Props = {};

type State = {
  config: {
    preset: string,
    width: number,
    height: number,
    zoom: number,
  },
};

class EmbeddedPreview extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      config: {
        preset: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.key,
        width: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.width,
        height: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.height,
        zoom: 50,
      },
    };
  }

  handleSetPreset = (preset: string) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        preset,
      },
    }));
  };

  handleSetWidth = (width: number) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        width,
      },
    }));
  };

  handleSetHeight = (height: number) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        height,
      },
    }));
  };

  handleSetZoom = (zoom: number) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        zoom,
      },
    }));
  };

  getContextState() {
    const { config } = this.state;
    return {
      ...config,
      setPreset: this.handleSetPreset,
      setWidth: this.handleSetWidth,
      setHeight: this.handleSetHeight,
      setZoom: this.handleSetZoom,
    };
  }

  render() {
    return (
      <EmbeddedPreviewConfigContext.Provider value={this.getContextState()}>
        <section className={styles.containerClass}>
          <EmbeddedPreviewHeader />
          <div className={styles.bodyClass}>
            <EmbeddedPreviewBody />
          </div>
        </section>
      </EmbeddedPreviewConfigContext.Provider>
    );
  }
}

export default EmbeddedPreview;
