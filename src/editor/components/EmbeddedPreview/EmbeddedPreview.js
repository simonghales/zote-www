// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import EmbeddedPreviewHeader from './components/EmbeddedPreviewHeader/EmbeddedPreviewHeader';
import EmbeddedPreviewBody from './components/EmbeddedPreviewBody/EmbeddedPreviewBody';
import { EMBEDDED_PREVIEW_CONFIG_CAUSES, EmbeddedPreviewConfigContext } from './context';
import { EMBEDDED_PREVIEW_CONFIG_PRESETS, getPresetDimensions } from './presets';
import type { EmbeddedPreviewConfigLastCause } from './context';
import type { ReduxRootState, ReduxDataState } from '../../../redux/store';
import { getSelectedComponentSelector } from '../../state/reselect/component';
import { mapComponentBlocksToMappedBlocks } from '../../../preview/data/block/state';
import { getReduxMixins, getReduxPresentState, getReduxStyles } from '../../../redux/styles/state';
import { getComponentsFromReduxEditorState } from '../../../redux/editor/state';
import { EditorUIContext } from '../../context/components/EditorUIContextWrapper/EditorUIContextWrapper';

type Props = {
  data: any,
};

type State = {
  config: {
    preset: string,
    width: number,
    height: number,
    zoom: number,
    preferredZoom: number,
    lastCause: EmbeddedPreviewConfigLastCause,
  },
};

class EmbeddedPreview extends Component<Props, State> {
  static contextType = EditorUIContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      config: {
        preset: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.key,
        width: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.width,
        height: EMBEDDED_PREVIEW_CONFIG_PRESETS.largeDesktop.height,
        zoom: 100,
        preferredZoom: 100,
        lastCause: EMBEDDED_PREVIEW_CONFIG_CAUSES.zoom, // null?
      },
    };
  }

  handleSetPreset = (preset: string) => {
    const dimensions = getPresetDimensions(preset);
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        preset,
        width: dimensions ? dimensions[0] : state.config.width,
        height: dimensions ? dimensions[1] : state.config.height,
        lastCause: EMBEDDED_PREVIEW_CONFIG_CAUSES.size,
        zoom: 100,
      },
    }));
  };

  handleSetWidth = (width: number, auto: boolean = false) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        width,
        preset: !auto ? '' : state.config.preset,
        lastCause: !auto ? EMBEDDED_PREVIEW_CONFIG_CAUSES.size : state.config.lastCause,
      },
    }));
  };

  handleSetHeight = (height: number, auto: boolean = false) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        height,
        preset: !auto ? '' : state.config.preset,
        lastCause: !auto ? EMBEDDED_PREVIEW_CONFIG_CAUSES.size : state.config.lastCause,
      },
    }));
  };

  handleSetZoom = (zoom: number, auto: boolean = false) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        zoom,
        lastCause: !auto ? EMBEDDED_PREVIEW_CONFIG_CAUSES.zoom : state.config.lastCause,
      },
    }));
  };

  handleSetPreferredZoom = (zoom: number) => {
    this.setState((state: State) => ({
      ...state,
      config: {
        ...state.config,
        preferredZoom: zoom,
      },
    }));
  };

  getContextState() {
    const { config } = this.state;
    const { data } = this.props;
    const { hoveredBlockKey } = this.context;
    return {
      ...config,
      setPreset: this.handleSetPreset,
      setWidth: this.handleSetWidth,
      setHeight: this.handleSetHeight,
      setZoom: this.handleSetZoom,
      setPreferredZoom: this.handleSetPreferredZoom,
      data,
      hoveredBlockKey,
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

const mapStateToProps = (rootState: ReduxRootState) => {
  const state = getReduxPresentState(rootState);
  const selectedComponent = getSelectedComponentSelector(rootState);
  const components = getComponentsFromReduxEditorState(state.editor);
  const reduxStyles = getReduxStyles(state);
  const reduxMixins = getReduxMixins(state);
  const mappedBlocks = mapComponentBlocksToMappedBlocks(
    selectedComponent,
    reduxStyles,
    reduxMixins,
    {},
    components
  );
  return {
    data: mappedBlocks,
  };
};

export const ComponentEmbeddedPreview = connect(mapStateToProps)(EmbeddedPreview);
