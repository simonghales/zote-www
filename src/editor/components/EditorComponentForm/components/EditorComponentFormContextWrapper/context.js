// @flow
import React from 'react';
import { STYLE_STATES } from '../../../../../data/styles/model';
import { customFormSection } from '../../data/styles';

export type BlockStylesSelector = {
  [string]: string,
};

export type EditorComponentFormContextState = {
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
  formSectionsVisibility: {
    [string]: boolean,
  },
  blockStylesSelector: BlockStylesSelector,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
  setBlockStylesSelector: (blockKey: string, selector: string) => void,
};

export const defaultEditorFormSectionsVisibility = {
  [customFormSection.key]: false,
};

const defaultState: EditorComponentFormContextState = {
  componentKey: '',
  blockKey: '',
  blockStyleKey: '',
  formSectionsVisibility: defaultEditorFormSectionsVisibility,
  blockStylesSelector: {},
  setFormSectionVisibility: () => {},
  setBlockStylesSelector: () => {},
};

export const EditorComponentFormContext = React.createContext(defaultState);
