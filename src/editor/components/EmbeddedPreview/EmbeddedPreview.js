// @flow
import React from 'react';
import styles from './styles';
import EmbeddedPreviewHeader from './components/EmbeddedPreviewHeader/EmbeddedPreviewHeader';

const EmbeddedPreview = () => (
  <section className={styles.containerClass}>
    <EmbeddedPreviewHeader />
    <div className={styles.bodyClass}>BODY...</div>
  </section>
);

export default EmbeddedPreview;
