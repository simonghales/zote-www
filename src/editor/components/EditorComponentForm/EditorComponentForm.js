// @flow
import React from 'react';
import { connect } from 'react-redux';
import FormSection from './components/FormSection/FormSection';
import { STYLES_FORM_DATA } from './data/styles';
import type { ReduxState } from '../../../redux/store';
import { getSelectedComponentKeySelector } from '../../state/reselect/component';
import { EditorComponentFormContext } from './context';
import {
  getEditorFormSectionsVisibility,
  getReduxUiComponentSelectedBlockKey,
} from '../../../redux/ui/state';
import { getReduxEditorComponents } from '../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
  getRootBlockKeyFromComponent,
} from '../../../data/component/state';
import { getStyleKeyFromBlock } from '../../../data/block/state';
import { STYLE_STATES } from '../../../data/styles/model';
import type { EditorFormSectionsVisibility } from '../../../redux/ui/reducer';
import { setEditorFormSectionVisibilityRedux } from '../../../redux/ui/reducer';

export function getFormSectionVisibility(
  sectionKey: string,
  formSectionsVisibility: EditorFormSectionsVisibility
): boolean {
  if (Object.prototype.hasOwnProperty.call(formSectionsVisibility, sectionKey)) {
    return formSectionsVisibility[sectionKey];
  }
  return true;
}

type Props = {
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
};

const EditorComponentForm = ({
  componentKey,
  blockKey,
  blockStyleKey,
  formSectionsVisibility,
  setFormSectionVisibility,
}: Props) => (
  <EditorComponentFormContext.Provider
    value={{ componentKey, blockKey, blockStyleKey, styleStateKey: STYLE_STATES.default }}
  >
    <div>
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
    </div>
  </EditorComponentFormContext.Provider>
);

const mapStateToProps = (state: ReduxState) => {
  const componentKey = getSelectedComponentKeySelector(state);
  const components = getReduxEditorComponents(state);
  const component = getComponentFromComponents(componentKey, components);
  let blockKey = getReduxUiComponentSelectedBlockKey(state.ui, componentKey);
  if (!blockKey) {
    blockKey = getRootBlockKeyFromComponent(component);
  }
  const block = getBlockFromComponent(component, blockKey);
  const blockStyleKey = getStyleKeyFromBlock(block);
  const formSectionsVisibility = getEditorFormSectionsVisibility(state.ui);
  return {
    componentKey,
    blockKey,
    blockStyleKey,
    formSectionsVisibility,
  };
};

const mapDispatchToProps = {
  setFormSectionVisibility: (sectionKey: string, visible: boolean) =>
    setEditorFormSectionVisibilityRedux(sectionKey, visible),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorComponentForm);
