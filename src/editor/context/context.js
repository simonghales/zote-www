// @flow
import React, { useContext } from 'react';

export const EditorContext = React.createContext({
  navigateToComponent: (componentKey: string) => {},
});

export function useGetEditorContext() {
  return useContext(EditorContext);
}

export function useGetEditorNavigateToComponent(): (componentKey: string) => void {
  const { navigateToComponent } = useGetEditorContext();
  return navigateToComponent;
}
