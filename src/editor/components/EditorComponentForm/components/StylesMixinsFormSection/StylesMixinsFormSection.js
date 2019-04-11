// @flow
import React from 'react';
import { stylesMixinsFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';

const StylesMixinsFormSection = () => (
  <FormSection
    heading={stylesMixinsFormSection.heading}
    columns={stylesMixinsFormSection.columns}
    visibilityKey={stylesMixinsFormSection.key}
  >
    todo...
  </FormSection>
);

export default StylesMixinsFormSection;
