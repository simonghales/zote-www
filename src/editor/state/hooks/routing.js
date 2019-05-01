// @flow

import { useContext } from 'react';
import { getEditorPath } from '../../routing/routing';
import { EditorContext } from '../../context/context';

export function useGetEditorPath(path: string): string {
  const { siteKey } = useContext(EditorContext);
  return getEditorPath(path, { siteKey });
}
