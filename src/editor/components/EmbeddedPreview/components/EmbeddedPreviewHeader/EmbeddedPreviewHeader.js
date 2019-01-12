// @flow
import React from 'react';
import { FaCaretDown, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './styles';
import { SlimIconDarkerButton } from '../../../Button/Button';
import DimensionsSelector from './components/DimensionsSelector/DimensionsSelector';

const DeviceSelector = () => (
  <div className={styles.deviceSelectorClass}>
    <div>Large Desktop</div>
    <FaCaretDown />
  </div>
);

const OpenInTab = () => (
  <SlimIconDarkerButton icon={<FaExternalLinkAlt size={10} />}>Open in tab</SlimIconDarkerButton>
);

const EmbeddedPreviewHeader = () => (
  <header className={styles.headerClass}>
    <div className={styles.optionClass}>
      <DeviceSelector />
    </div>
    <div className={styles.optionClass}>
      <DimensionsSelector />
    </div>
    <div className={styles.optionClass}>
      <OpenInTab />
    </div>
  </header>
);

export default EmbeddedPreviewHeader;
