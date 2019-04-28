// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ReduxRootState } from '../../../redux/store';
import { getSelectedComponentKeySelector } from '../../state/reselect/component';
import { EditorComponentFormContext } from './components/EditorComponentFormContextWrapper/context';
import { getEditorFormSectionsVisibility } from '../../../redux/ui/state';
import {
  getAddPropsEnabledFromBlock,
  getHtmlEnabledFromBlock,
  getPropsEnabledFromBlock,
  getStyleKeyFromBlock,
  getStylesEnabledFromBlock,
} from '../../../data/block/state';
import type { EditorFormSectionsVisibility } from '../../../redux/ui/reducer';
import { setEditorFormSectionVisibilityRedux } from '../../../redux/ui/reducer';
import { ContentFormView, HtmlFormView } from './views/PropsFormView/PropsFormView';
import {
  HTML_NAV_OPTION,
  STYLES_NAV_OPTION,
} from '../EditorSection/components/EditorSectionNav/EditorSectionNav';
import StylesFormView from './views/StylesFormView/StylesFormView';
import DisabledFormView from './views/DisabledFormView/DisabledFormView';
import { getSelectedComponentSelectedBlock } from '../../state/reselect/ui';
import EditorComponentFormContextWrapper from './components/EditorComponentFormContextWrapper/EditorComponentFormContextWrapper';
import { getBlockStylesSelector } from './components/StylesStateFormSection/StylesStateFormSection';
import { getReduxPresentState } from '../../../redux/styles/state';
import { getReduxUIState } from '../../../redux/shared/state';

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
      <EditorComponentFormContextWrapper
        blockKey={blockKey}
        componentKey={componentKey}
        blockStyleKey={blockStyleKey}
      >
        <EditorComponentFormContext.Consumer>
          {({ blockStylesSelector }) => (
            <div key={`${blockKey}:${getBlockStylesSelector(blockStylesSelector, blockKey)}`}>
              {this.renderFormView()}
            </div>
          )}
        </EditorComponentFormContext.Consumer>
      </EditorComponentFormContextWrapper>
    );
  }
}

const mapStateToProps = (rootState: ReduxRootState) => {
  const uiState = getReduxUIState(rootState);
  const componentKey = getSelectedComponentKeySelector(rootState);
  const block = getSelectedComponentSelectedBlock(rootState);
  const blockStyleKey = getStyleKeyFromBlock(block);
  const formSectionsVisibility = getEditorFormSectionsVisibility(uiState);
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
