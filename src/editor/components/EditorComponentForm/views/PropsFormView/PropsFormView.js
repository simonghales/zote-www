// @flow
import React from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { getFormSectionVisibility } from '../../EditorComponentForm';
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';
import FormSection from '../../components/FormSection/FormSection';
import type { ReduxState } from '../../../../../redux/store';
import { getComponentsFromReduxEditorState } from '../../../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
} from '../../../../../data/component/state';
import {
  getBlockContentProps,
  getBlockHtmlProps,
  sortBlockPropsConfig,
} from '../../../../../data/block/state';
import { mapBlockPropConfigsToEditorFormInputModel } from '../../data/state';
import AddCustomPropForm from './components/AddCustomPropForm/AddCustomPropForm';
import styles from './styles';

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
  // eslint-disable-next-line react/require-default-props
  addPropsEnabled?: boolean,
};

type Props = PassedProps & {
  sections: Array<any>,
  viewType: contentFormViewTypes,
  addPropsEnabled?: boolean,
};

const PropsFormView = ({
  addPropsEnabled,
  sections,
  formSectionsVisibility,
  setFormSectionVisibility,
  blockKey,
  componentKey,
}: Props) => (
  <React.Fragment>
    {addPropsEnabled && <AddCustomPropForm componentKey={componentKey} blockKey={blockKey} />}
    <div
      className={cx(styles.containerClass, {
        [styles.containerNoMarginClass]: addPropsEnabled,
      })}
    >
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
    </div>
  </React.Fragment>
);

PropsFormView.defaultProps = {
  addPropsEnabled: false,
};

const mapStateToProps = (state: ReduxState, { blockKey, componentKey, viewType }: Props) => {
  const components = getComponentsFromReduxEditorState(state.editor);
  const component = getComponentFromComponents(componentKey, components);
  const block = getBlockFromComponent(component, blockKey);
  const propsConfig =
    viewType === CONTENT_FORM_VIEW_TYPES.content
      ? getBlockContentProps(block)
      : getBlockHtmlProps(block);
  const sortedPropsConfig = sortBlockPropsConfig(propsConfig);
  const inputs = mapBlockPropConfigsToEditorFormInputModel(sortedPropsConfig, block);
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
