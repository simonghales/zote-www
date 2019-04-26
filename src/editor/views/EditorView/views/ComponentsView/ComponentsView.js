// @flow
import React from 'react';
import { useSelectedPreviewComponent } from '../../../../state/hooks/components';
import * as styles from './styles';
import ComponentEditor from './components/ComponentEditor/ComponentEditor';

const ComponentsView = () => {
  const component = useSelectedPreviewComponent();
  if (!component) return null;
  return (
    <div className={styles.containerClass} key={component.key}>
      <div className={styles.editorClass}>
        <ComponentEditor component={component} />
      </div>
      <div className={styles.previewClass}>Component Preview</div>
    </div>
  );
};

export default ComponentsView;
