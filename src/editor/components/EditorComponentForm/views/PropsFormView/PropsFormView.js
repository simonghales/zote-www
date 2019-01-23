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
import { getBlockContentProps, getBlockHtmlProps } from '../../../../../data/block/state';
import { mapBlockPropConfigsToEditorFormInputModel } from '../../data/state';

export const CONTENT_FORM_VIEW_TYPES = {
  content: 'content',
  html: 'html',
};

export type contentFormViewTypes = $Keys<typeof CONTENT_FORM_VIEW_TYPES>;

type PassedProps = {
  blockKey: string,
  componentKey: string,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

type Props = PassedProps & {
  sections: Array<any>,
  viewType: contentFormViewTypes,
};

const PropsFormView = ({ sections, formSectionsVisibility, setFormSectionVisibility }: Props) => (
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

const mapStateToProps = (state: ReduxState, { blockKey, componentKey, viewType }: Props) => {
  const components = getComponentsFromReduxEditorState(state.editor);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const propsConfig =
    viewType === CONTENT_FORM_VIEW_TYPES.content
      ? getBlockContentProps(block)
      : getBlockHtmlProps(block);
  const inputs = mapBlockPropConfigsToEditorFormInputModel(propsConfig, block);
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

const MappedPropsFormView = connect(mapStateToProps)(PropsFormView);

export default MappedPropsFormView;

export const ContentFormView = (props: PassedProps) => (
  <MappedPropsFormView {...props} viewType={CONTENT_FORM_VIEW_TYPES.content} />
);

export const HtmlFormView = (props: PassedProps) => (
  <MappedPropsFormView {...props} viewType={CONTENT_FORM_VIEW_TYPES.html} />
);
