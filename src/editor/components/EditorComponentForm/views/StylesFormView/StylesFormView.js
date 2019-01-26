// @flow
import React from 'react';
import styles from './styles';
import { STYLES_FORM_DATA } from '../../data/styles';
import { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';
import FormSection from '../../components/FormSection/FormSection';

type Props = {
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

const StylesFormView = ({ formSectionsVisibility, setFormSectionVisibility }: Props) => (
  <div className={styles.containerClass}>
    {STYLES_FORM_DATA.sections.map(section => (
      <FormSection
        heading={section.heading}
        columns={section.columns}
        key={section.key}
        visible={getFormSectionVisibility(section.key, formSectionsVisibility)}
        setVisible={(visible: boolean) => {
          setFormSectionVisibility(section.key, visible);
        }}
      />
    ))}
  </div>
);

export default StylesFormView;
