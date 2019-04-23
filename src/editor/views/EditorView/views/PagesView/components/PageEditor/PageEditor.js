// @flow
import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import EditorHeader from '../../../../../../components/EditorHeader/EditorHeader';
import { useSelectedPage } from '../../../../../../state/hooks/pages';
import { getPageName } from '../../../../../../../data/page/state';
import * as styles from './styles';
import { SlimIconButton, SolidButton } from '../../../../../../components/Button/Button';
import FormSection from '../../../../../../components/EditorComponentForm/components/FormSection/FormSection';
import FormInput from '../../../../../../components/EditorComponentForm/components/FormInput/FormInput';
import { FORM_INPUT_TYPES } from '../../../../../../components/EditorComponentForm/components/FormInput/components/FormInputBody/FormInputBody';
import FormSectionRow from '../../../../../../components/EditorComponentForm/components/FormSection/components/FormSectionRow/FormSectionRow';

const PageEditor = () => {
  const page = useSelectedPage();
  if (!page) return null;
  return (
    <div className={styles.containerClass}>
      <EditorHeader title={getPageName(page)} />
      <section className={styles.bodyClass}>
        <div className={styles.editBlocksWrapperClass}>
          <SlimIconButton icon={<FaEdit size={9} />}>Edit Blocks</SlimIconButton>
        </div>
        <FormSection heading="Page Settings">
          <FormSectionRow>
            <FormInput
              updateValue={() => {}}
              defaultValue=""
              value=""
              inputType={FORM_INPUT_TYPES.string}
              name="Name"
              inputKey=""
              inactive={false}
            />
          </FormSectionRow>
          <FormSectionRow>
            <FormInput
              updateValue={() => {}}
              defaultValue=""
              value=""
              inputType={FORM_INPUT_TYPES.string}
              name="Slug"
              inputKey=""
              inactive={false}
            />
          </FormSectionRow>
        </FormSection>
      </section>
      <footer className={styles.footerClass}>
        <SolidButton>Save Changes</SolidButton>
      </footer>
    </div>
  );
};

export default PageEditor;
