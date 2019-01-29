// @flow
import React from 'react';
import { FaCaretDown, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './styles';
import { SlimIconDarkerButton } from '../../../Button/Button';
import DimensionsSelector from './components/DimensionsSelector/DimensionsSelector';
import { EmbeddedPreviewConfigContext } from '../../context';
import ZoomSelector from './components/ZoomSelector/ZoomSelector';
import DeviceSelector from './components/DeviceSelector/DeviceSelector';

// const ZoomSelector = () => (
//   <div className={styles.zoomSelectorClass}>
//     <div>100%</div>
//     <FaCaretDown />
//   </div>
// );

const OpenInTab = () => (
  <SlimIconDarkerButton icon={<FaExternalLinkAlt size={10} />}>Open in tab</SlimIconDarkerButton>
);

const EmbeddedPreviewHeader = () => (
  <EmbeddedPreviewConfigContext.Consumer>
    {({ width, height, setWidth, setHeight, zoom, setZoom, setPreferredZoom, preset, setPreset }) => (
      <header className={styles.headerClass}>
        <div className={styles.optionClass}>
          <DeviceSelector preset={preset} setPreset={setPreset} width={width} height={height} />
        </div>
        <div className={styles.optionClass}>
          <DimensionsSelector
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
          />
        </div>
        <div className={styles.optionClass}>
          <ZoomSelector zoom={zoom} setZoom={setZoom} setPreferredZoom={setPreferredZoom} />
        </div>
        <div className={styles.optionClass}>
          <OpenInTab />
        </div>
      </header>
    )}
  </EmbeddedPreviewConfigContext.Consumer>
);

export default EmbeddedPreviewHeader;
