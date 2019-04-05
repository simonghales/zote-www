// @flow
import React from 'react';
import { connect } from 'react-redux';
import BlockProps from '../BlockProps/BlockProps';
import type { EditorFormSectionsVisibility } from '../../../../../../../redux/ui/reducer';
import type { contentFormViewTypes } from '../../shared';
import type { ReduxState } from '../../../../../../../redux/store';
import {
  getComponentBlockFromReduxEditorState,
  getComponentFromReduxEditorState,
} from '../../../../../../../redux/editor/state';
import { getBlockComponentImportKey } from '../../../../../../../data/block/state';
import { getRootBlockKeyFromComponent } from '../../../../../../../data/component/state';

type Props = {
  componentKey: string,
  blockKey: string,
  componentImportKey: string,
  componentImportRootBlockKey: string,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
  viewType: contentFormViewTypes,
};

const ComponentImportBlockProps = ({
  componentImportKey,
  componentImportRootBlockKey,
  formSectionsVisibility,
  setFormSectionVisibility,
  viewType,
}: Props) => {
  if (!componentImportKey || !componentImportRootBlockKey) return null;
  return (
    <BlockProps
      componentKey={componentImportKey}
      blockKey={componentImportRootBlockKey}
      formSectionsVisibility={formSectionsVisibility}
      setFormSectionVisibility={setFormSectionVisibility}
      viewType={viewType}
    />
  );
};

const mapStateToProps = (state: ReduxState, { componentKey, blockKey }: Props) => {
  const block = getComponentBlockFromReduxEditorState(state.editor, componentKey, blockKey);
  const componentImportKey = getBlockComponentImportKey(block);
  let componentImportRootBlockKey = '';
  if (componentImportKey) {
    const component = getComponentFromReduxEditorState(state.editor, componentImportKey);
    if (component) {
      componentImportRootBlockKey = getRootBlockKeyFromComponent(component);
    }
  }
  return {
    componentImportKey,
    componentImportRootBlockKey,
  };
};

export default connect(mapStateToProps)(ComponentImportBlockProps);
