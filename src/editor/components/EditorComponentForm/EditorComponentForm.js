// @flow
import React from 'react';
import { connect } from 'react-redux';
import FormSection from './components/FormSection/FormSection';
import { STYLES_FORM_DATA } from './data/styles';
import type { ReduxState } from '../../../redux/store';
import { getSelectedComponentKeySelector } from '../../state/reselect/component';
import { EditorComponentFormContext } from './context';

type Props = {
  componentKey: string,
};

const EditorComponentForm = ({ componentKey }: Props) => (
  <EditorComponentFormContext.Provider value={{ componentKey }}>
    <div>
      {STYLES_FORM_DATA.sections.map(section => (
        <FormSection heading={section.heading} rows={section.rows} key={section.key} />
      ))}
    </div>
  </EditorComponentFormContext.Provider>
);

const mapStateToProps = (state: ReduxState) => ({
  componentKey: getSelectedComponentKeySelector(state),
});

export default connect(mapStateToProps)(EditorComponentForm);
