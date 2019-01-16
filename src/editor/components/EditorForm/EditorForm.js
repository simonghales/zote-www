// @flow
import React from 'react';
import FormSection from './components/FormSection/FormSection';
import {STYLES_FORM_DATA} from './data/styles';

const EditorForm = () => (
  <div>
    {STYLES_FORM_DATA.sections.map(section => (
      <FormSection heading={section.heading} rows={section.rows} key={section.key} />
    ))}
  </div>
);

export default EditorForm;
