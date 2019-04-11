// @flow
import React from 'react';
import styles from './styles';
import { STYLES_FORM_DATA } from '../../data/styles';
import { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';
import FormColumnsSection from '../../components/FormColumnsSection/FormColumnsSection';
import CustomStylesFormSection from '../../components/CustomStylesFormSection/CustomStylesFormSection';
import StylesStateFormSection from '../../components/StylesStateFormSection/StylesStateFormSection';
import StylesMixinsFormSection from '../../components/StylesMixinsFormSection/StylesMixinsFormSection';

type Props = {
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

const StylesFormView = ({ formSectionsVisibility, setFormSectionVisibility }: Props) => (
  <div className={styles.containerClass}>
    <StylesStateFormSection />
    <StylesMixinsFormSection />
    {STYLES_FORM_DATA.sections.map(section => (
      <FormColumnsSection
        heading={section.heading}
        columns={section.columns}
        key={section.key}
        visibilityKey={section.key}
        visible={getFormSectionVisibility(section.key, formSectionsVisibility)}
        setVisible={(visible: boolean) => {
          setFormSectionVisibility(section.key, visible);
        }}
      />
    ))}
    <CustomStylesFormSection />
  </div>
);

export default StylesFormView;
