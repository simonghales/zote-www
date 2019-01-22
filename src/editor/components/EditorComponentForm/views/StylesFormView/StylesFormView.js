// @flow
import React from 'react';
import { STYLES_FORM_DATA } from '../../data/styles';
import FormSection, { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';

type Props = {
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

const StylesFormView = ({ formSectionsVisibility, setFormSectionVisibility }: Props) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default StylesFormView;
