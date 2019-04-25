// @flow
import React from 'react';
import * as styles from './styles';
import PagePreview from './components/PagePreview/PagePreview';
import PageEditor from './components/PageEditor/PageEditor';
import { useSelectedPage } from '../../../../state/hooks/pages';

const PagesView = () => {
  const page = useSelectedPage();
  if (!page) return null;
  return (
    <div className={styles.containerClass}>
      <div className={styles.editorClass}>
        <PageEditor page={page} key={page.key} />
      </div>
      <div className={styles.previewClass}>
        <PagePreview page={page} />
      </div>
    </div>
  );
};

export default PagesView;
