// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getFormSectionVisibility } from '../../../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../../../redux/ui/reducer';
import type { ReduxState } from '../../../../../../../redux/store';
import { getComponentsFromReduxEditorState } from '../../../../../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
} from '../../../../../../../data/component/state';
import {
  getBlockComponentImportedContentProps,
  getBlockContentProps,
  getBlockHtmlProps,
  sortBlockPropsConfig,
} from '../../../../../../../data/block/state';
import { mapBlockPropConfigsToEditorFormInputModel } from '../../../../data/state';
import FormColumnsSection from '../../../../components/FormColumnsSection/FormColumnsSection';
import { CONTENT_FORM_VIEW_TYPES } from '../../shared';
import type { contentFormViewTypes } from '../../shared';

type Props = {
  blockKey: string,
  componentKey: string,
  sections: Array<any>,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
  viewType: contentFormViewTypes,
};

const BlockProps = ({ sections, formSectionsVisibility, setFormSectionVisibility }: Props) => (
  <React.Fragment>
    {sections.map(section => (
      <FormColumnsSection
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

const mapStateToProps = (state: ReduxState, { blockKey, componentKey, viewType }: Props) => {
  const components = getComponentsFromReduxEditorState(state.editor);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const propsConfig =
    viewType === CONTENT_FORM_VIEW_TYPES.content
      ? getBlockContentProps(block)
      : getBlockHtmlProps(block);
  const sortedPropsConfig = sortBlockPropsConfig(propsConfig);
  const componentImportedPropsConfig =
    viewType === CONTENT_FORM_VIEW_TYPES.content
      ? getBlockComponentImportedContentProps(block, components)
      : [];
  const inputs = mapBlockPropConfigsToEditorFormInputModel(
    sortedPropsConfig.concat(componentImportedPropsConfig),
    block
  );
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

export default connect(mapStateToProps)(BlockProps);
