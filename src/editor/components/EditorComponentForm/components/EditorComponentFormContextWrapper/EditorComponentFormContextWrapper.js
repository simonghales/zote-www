// @flow
import React, { useState } from 'react';
import { customFormSection } from '../../data/styles';
import { EditorComponentFormContext } from './context';

const defaultEditorFormSectionsVisibility = {
  [customFormSection.key]: false,
};

const defaultBlockStylesSelector = {};

type Props = {
  children: any,
  componentKey: string,
  blockKey: string,
  blockStyleKey: string,
};

const EditorComponentFormContextWrapper = ({
  children,

  componentKey,
  blockKey,
  blockStyleKey,
}: Props) => {
  const [formSectionsVisibility, setFormSectionsVisiblity] = useState(
    defaultEditorFormSectionsVisibility
  );

  const [blockStylesSelector, setBlockStylesSelector] = useState(defaultBlockStylesSelector);

  const handleSetBlockStylesSelector = (selectedBlockKey: string, selector: string) => {
    setBlockStylesSelector({
      ...blockStylesSelector,
      [selectedBlockKey]: selector,
    });
  };

  const setFormSectionVisibility = (sectionKey: string, visible: boolean) => {
    setFormSectionsVisiblity({
      ...formSectionsVisibility,
      [sectionKey]: visible,
    });
  };

  return (
    <EditorComponentFormContext.Provider
      value={{
        componentKey,
        blockKey,
        blockStyleKey,
        formSectionsVisibility,
        setFormSectionVisibility,
        blockStylesSelector,
        setBlockStylesSelector: handleSetBlockStylesSelector,
      }}
    >
      {children}
    </EditorComponentFormContext.Provider>
  );
};

export default EditorComponentFormContextWrapper;
