// @flow
import React from 'react';
import { customFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import CustomStylesInput from '../CustomStylesInput/CustomStylesInput';
import type { EditorComponentFormContextState } from '../EditorComponentFormContextWrapper/context';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';

type Props = {};

class CustomStylesFormSection extends React.Component<Props> {
  context: EditorComponentFormContextState;

  static contextType = EditorComponentFormContext;

  render() {
    const { blockStyleKey, styleStateKey } = this.context;
    return (
      <FormSection
        heading={customFormSection.heading}
        columns={customFormSection.columns}
        visibilityKey={customFormSection.key}
      >
        <CustomStylesInput blockStyleKey={blockStyleKey} styleStateKey={styleStateKey} />
      </FormSection>
    );
  }
}

export default CustomStylesFormSection;
