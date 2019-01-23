// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';
import FormSection from '../../components/FormSection/FormSection';
import type { ReduxState } from '../../../../../redux/store';
import { getComponentSelectedBlockKey } from '../../../../../redux/ui/state';
import { getComponentsFromReduxEditorState } from '../../../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
} from '../../../../../data/component/state';
import { getBlockContentProps } from '../../../../../data/block/state';
import { mapBlockPropConfigsToEditorFormInputModel } from '../../data/state';

type Props = {
  blockKey: string,
  componentKey: string,
  sections: Array<any>,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

const ContentFormView = ({ sections, formSectionsVisibility, setFormSectionVisibility }: Props) => (
  <React.Fragment>
    {sections.map(section => (
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

const mapStateToProps = (state: ReduxState, { blockKey, componentKey }: Props) => {
  const components = getComponentsFromReduxEditorState(state.editor);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const contentPropsConfigs = getBlockContentProps(block);
  const inputs = mapBlockPropConfigsToEditorFormInputModel(contentPropsConfigs);
  const sections = [
    {
      heading: '',
      key: '',
      columns: inputs.map(input => ({
        columns: 4,
        input,
      })),
    },
  ];
  return {
    sections,
  };
};

export default connect(mapStateToProps)(ContentFormView);
