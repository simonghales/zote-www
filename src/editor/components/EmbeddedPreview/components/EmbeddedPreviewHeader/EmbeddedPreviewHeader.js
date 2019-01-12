// @flow
import React from 'react';
import { FaCaretDown, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './styles';
import { SlimIconDarkerButton } from '../../../Button/Button';
import DimensionsSelector from './components/DimensionsSelector/DimensionsSelector';
import { EmbeddedPreviewConfigContext } from '../../context';

const DeviceSelector = () => (
  <div className={styles.deviceSelectorClass}>
    <div>Large Desktop</div>
    <FaCaretDown />
  </div>
);

const ZoomSelector = () => (
  <div className={styles.zoomSelectorClass}>
    <div>100%</div>
    <FaCaretDown />
  </div>
);

const OpenInTab = () => (
  <SlimIconDarkerButton icon={<FaExternalLinkAlt size={10} />}>Open in tab</SlimIconDarkerButton>
);

const EmbeddedPreviewHeader = () => (
  <EmbeddedPreviewConfigContext.Consumer>
    {({ width, height, setWidth, setHeight }) => (
      <header className={styles.headerClass}>
        <div className={styles.optionClass}>
          <DeviceSelector />
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
          <ZoomSelector />
        </div>
        <div className={styles.optionClass}>
          <OpenInTab />
        </div>
      </header>
    )}
  </EmbeddedPreviewConfigContext.Consumer>
);

export default EmbeddedPreviewHeader;
