// @flow
import React from 'react';
import styles from './styles';
import EditorForm from '../../../EditorComponentForm/EditorComponentForm';

type Props = {
  selectedTab: string,
};

const EditorSectionBody = ({ selectedTab }: Props) => (
  <div className={styles.containerClass}>
    <EditorForm selectedTab={selectedTab} />
  </div>
);

export default EditorSectionBody;
