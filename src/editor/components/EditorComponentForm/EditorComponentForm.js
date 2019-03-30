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
import {
  getReduxEditorComponents,
  getSelectedComponentSelectedBlock,
} from '../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
  getRootBlockKeyFromComponent,
} from '../../../data/component/state';
import {
  getAddPropsEnabledFromBlock,
  getHtmlEnabledFromBlock,
  getPropsEnabledFromBlock,
  getStyleKeyFromBlock,
  getStylesEnabledFromBlock,
} from '../../../data/block/state';
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
import DisabledFormView from './views/DisabledFormView/DisabledFormView';

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
  propsEnabled: boolean,
  stylesEnabled: boolean,
  htmlEnabled: boolean,
  addPropsEnabled: boolean,
};

class EditorComponentForm extends React.Component<Props> {
  renderFormView() {
    const {
      componentKey,
      blockKey,
      formSectionsVisibility,
      setFormSectionVisibility,
      selectedTab,
      propsEnabled,
      stylesEnabled,
      htmlEnabled,
      addPropsEnabled,
    } = this.props;
    if (selectedTab === STYLES_NAV_OPTION.key) {
      if (!stylesEnabled) {
        return <DisabledFormView message="This block cannot be styled." />;
      }
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
      if (!htmlEnabled) {
        return <DisabledFormView message="HTML cannot be modified for this block." />;
      }
      return <HtmlFormView {...sharedProps} />;
    }
    if (!propsEnabled) {
      return <DisabledFormView message="Content cannot be modified for this block." />;
    }
    return <ContentFormView {...sharedProps} addPropsEnabled={addPropsEnabled} />;
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
  const block = getSelectedComponentSelectedBlock(state);
  const blockStyleKey = getStyleKeyFromBlock(block);
  const formSectionsVisibility = getEditorFormSectionsVisibility(state.ui);
  const propsEnabled = getPropsEnabledFromBlock(block);
  const stylesEnabled = getStylesEnabledFromBlock(block);
  const htmlEnabled = getHtmlEnabledFromBlock(block);
  const addPropsEnabled = getAddPropsEnabledFromBlock(block);
  return {
    componentKey,
    blockKey: block.key,
    blockStyleKey,
    formSectionsVisibility,
    propsEnabled,
    stylesEnabled,
    htmlEnabled,
    addPropsEnabled,
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
