// @flow
import React, { useState } from 'react';
import { FaEdit, FaExternalLinkAlt, FaPlus } from 'react-icons/fa';
import EditorHeader from '../../../../../../components/EditorHeader/EditorHeader';
import { useDispatchUpdatePageDetails, useSelectedPage } from '../../../../../../state/hooks/pages';
import { getPageName, getPageSlug } from '../../../../../../../data/page/state';
import * as styles from './styles';
import { SlimIconButton, SolidButton } from '../../../../../../components/Button/Button';
import FormSection from '../../../../../../components/EditorComponentForm/components/FormSection/FormSection';
import FormInput from '../../../../../../components/EditorComponentForm/components/FormInput/FormInput';
import { FORM_INPUT_TYPES } from '../../../../../../components/EditorComponentForm/components/FormInput/components/FormInputBody/FormInputBody';
import FormSectionRow from '../../../../../../components/EditorComponentForm/components/FormSection/components/FormSectionRow/FormSectionRow';
import type { PageModel } from '../../../../../../../data/page/model';
import { goToEditPageComponent, openPagePreview } from '../../../../../../routing/actions';

type Props = {
  page: PageModel,
};

const PageEditor = ({ page }: Props) => {
  const name = getPageName(page);
  const [nameInput, setName] = useState(name);
  const slug = getPageSlug(page);
  const [slugInput, setSlug] = useState(slug);
  const pendingChanges = name !== nameInput || slug !== slugInput;
  const updatePageDetails = useDispatchUpdatePageDetails();
  const handleSetSlug = (newSlug: string) => {
    if (newSlug.startsWith('/')) {
      newSlug = newSlug.slice(1);
    }
    setSlug(newSlug);
  };
  const handleSaveChanges = () => {
    updatePageDetails(page.key, nameInput, slugInput);
  };
  return (
    <div className={styles.containerClass}>
      <EditorHeader title={getPageName(page)} />
      <section className={styles.bodyClass}>
        <div className={styles.editBlocksWrapperClass}>
          <SlimIconButton
            icon={<FaEdit size={9} />}
            onClick={() => {
              goToEditPageComponent(page.key);
            }}
          >
            Edit Blocks
          </SlimIconButton>
          <SlimIconButton
            icon={<FaExternalLinkAlt size={9} />}
            onClick={() => {
              openPagePreview(page);
            }}
          >
            Preview Page
          </SlimIconButton>
        </div>
        <FormSection heading="Page Settings">
          <FormSectionRow>
            <FormInput
              updateValue={setName}
              defaultValue=""
              value={nameInput}
              inputType={FORM_INPUT_TYPES.string}
              name="Name"
              inputKey="page-name"
              inactive={!nameInput}
            />
          </FormSectionRow>
          <FormSectionRow>
            <FormInput
              updateValue={handleSetSlug}
              defaultValue=""
              value={`/${slugInput}`}
              inputType={FORM_INPUT_TYPES.string}
              name="Slug"
              inputKey="page-slug"
              inactive={false}
            />
          </FormSectionRow>
        </FormSection>
      </section>
      <footer className={styles.footerClass}>
        <SolidButton disabled={!pendingChanges} onClick={handleSaveChanges}>
          Save Changes
        </SolidButton>
      </footer>
    </div>
  );
};

export default PageEditor;
