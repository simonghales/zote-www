// @flow
import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import EditorHeader from '../../../../../../components/EditorHeader/EditorHeader';
import { useSelectedPage } from '../../../../../../state/hooks/pages';
import { getPageName } from '../../../../../../../data/page/state';
import * as styles from './styles';
import { SlimIconButton, SolidButton } from '../../../../../../components/Button/Button';
import FormSection from '../../../../../../components/EditorComponentForm/components/FormSection/FormSection';

const PageEditor = () => {
  const page = useSelectedPage();
  if (!page) return null;
  return (
    <div>
      <EditorHeader title={getPageName(page)} />
      <section className={styles.bodyClass}>
        <div className={styles.editBlocksWrapperClass}>
          <SlimIconButton icon={<FaEdit size={9} />}>Edit Blocks</SlimIconButton>
        </div>
        <FormSection heading="Page Settings">
          <div>Page Name</div>
          <div>Page Slug</div>
        </FormSection>
        <footer>
          <SolidButton>Save Changes</SolidButton>
        </footer>
      </section>
    </div>
  );
};

export default PageEditor;
