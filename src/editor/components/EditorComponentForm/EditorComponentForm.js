// @flow
import React from 'react';
import { connect } from 'react-redux';
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
import {
  CONTENT_FORM_VIEW_TYPES,
  ContentFormView,
  HtmlFormView,
} from './views/PropsFormView/PropsFormView';
import {
  CONTENT_NAV_OPTION,
  HTML_NAV_OPTION,
  STYLES_NAV_OPTION,
} from '../EditorSection/components/EditorSectionNav/EditorSectionNav';
import StylesFormView from './views/StylesFormView/StylesFormView';

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
  selectedTab: string,
};

class EditorComponentForm extends React.Component<Props> {
  renderFormView() {
    const {
      componentKey,
      blockKey,
      formSectionsVisibility,
      setFormSectionVisibility,
      selectedTab,
    } = this.props;
    if (selectedTab === STYLES_NAV_OPTION.key) {
      return (
        <StylesFormView
          formSectionsVisibility={formSectionsVisibility}
          setFormSectionVisibility={setFormSectionVisibility}
        />
      );
    }
    const sharedProps = {
      blockKey,
      componentKey,
      formSectionsVisibility,
      setFormSectionVisibility,
    };
    if (selectedTab === HTML_NAV_OPTION.key) {
      return <HtmlFormView {...sharedProps} />;
    }
    return <ContentFormView {...sharedProps} />;
  }

  render() {
    const { componentKey, blockKey, blockStyleKey } = this.props;
    return (
      <EditorComponentFormContext.Provider
        value={{ componentKey, blockKey, blockStyleKey, styleStateKey: STYLE_STATES.default }}
      >
        <div key={blockKey}>{this.renderFormView()}</div>
      </EditorComponentFormContext.Provider>
    );
  }
}

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
