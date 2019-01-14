// @flow
import React from 'react';
import styles from './styles';

const getPreviewUrl = (): string => `${window.location.origin}/preview`;

const ModuleIframe = () => <iframe className={styles.iframeClass} src={getPreviewUrl()} />;

export default ModuleIframe;
