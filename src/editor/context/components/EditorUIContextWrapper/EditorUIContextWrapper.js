// @flow-disabled
import React, { useContext, useState } from 'react';

type EditorUIContextState = {
  hoveredBlockKey: string,
  setHoveredBlockKey: (blockKey: string) => void,
};

export const EditorUIContext = React.createContext<EditorUIContextState>({
  hoveredBlockKey: '',
  setHoveredBlockKey: (blockKey: string) => {},
});

type Props = {
  children: any,
};

const EditorUIContextWrapper = ({ children }: Props) => {
  const [hoveredBlockKey, setHoveredBlockKey] = useState('');
  return (
    <EditorUIContext.Provider
      value={{
        hoveredBlockKey,
        setHoveredBlockKey,
      }}
    >
      {children}
    </EditorUIContext.Provider>
  );
};

export default EditorUIContextWrapper;

export function useGetEditorUIContext(): EditorUIContextState {
  return useContext(EditorUIContext);
}
