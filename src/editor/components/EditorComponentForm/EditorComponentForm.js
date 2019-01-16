// @flow
import React from 'react';
import { connect } from 'react-redux';
import FormSection from './components/FormSection/FormSection';
import { STYLES_FORM_DATA } from './data/styles';
import type { ReduxState } from '../../../redux/store';
import { getSelectedComponentKeySelector } from '../../state/reselect/component';
import { EditorComponentFormContext } from './context';
import { getReduxUiComponentSelectedBlockKey } from '../../../redux/ui/state';
import { getReduxEditorComponents } from '../../../redux/editor/state';
import {
  getBlockFromComponent,
  getComponentFromComponents,
  getRootBlockKeyFromComponent,
} from '../../../data/component/state';
import { getStyleKeyFromBlock } from '../../../data/block/state';

type Props = {
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
};

const EditorComponentForm = ({ componentKey, blockKey, blockStyleKey }: Props) => (
  <EditorComponentFormContext.Provider value={{ componentKey, blockKey, blockStyleKey }}>
    <div>
      {STYLES_FORM_DATA.sections.map(section => (
        <FormSection heading={section.heading} rows={section.rows} key={section.key} />
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
  return {
    componentKey,
    blockKey,
    blockStyleKey,
  };
};

export default connect(mapStateToProps)(EditorComponentForm);
