// @flow
import React from 'react';
import { customFormSection } from '../../data/styles';
import { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';
import FormSection from '../FormSection/FormSection';
import CustomStylesInput from '../CustomStylesInput/CustomStylesInput';
import type { EditorComponentFormContextState } from '../../context';
import { EditorComponentFormContext } from '../../context';

type Props = {
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

class CustomStylesFormSection extends React.Component<Props> {
  context: EditorComponentFormContextState;

  static contextType = EditorComponentFormContext;

  render() {
    const { formSectionsVisibility, setFormSectionVisibility } = this.props;
    const { blockStyleKey, styleStateKey } = this.context;
    return (
      <FormSection
        heading={customFormSection.heading}
        columns={customFormSection.columns}
        visible={getFormSectionVisibility(customFormSection.key, formSectionsVisibility)}
        setVisible={(visible: boolean) => {
          setFormSectionVisibility(customFormSection.key, visible);
        }}
      >
        <CustomStylesInput blockStyleKey={blockStyleKey} styleStateKey={styleStateKey} />
      </FormSection>
    );
  }
}

export default CustomStylesFormSection;
