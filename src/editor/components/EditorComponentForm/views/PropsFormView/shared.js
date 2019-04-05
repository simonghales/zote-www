// @flow
import type { EditorFormSectionsVisibility } from '../../../../../redux/ui/reducer';

export const CONTENT_FORM_VIEW_TYPES = {
  content: 'content',
  html: 'html',
};
export type contentFormViewTypes = $Keys<typeof CONTENT_FORM_VIEW_TYPES>;
export type PassedProps = {
  blockKey: string,
  componentKey: string,
  formSectionsVisibility: EditorFormSectionsVisibility,
  setFormSectionVisibility: (sectionKey: string, visible: boolean) => void,
  // eslint-disable-next-line react/require-default-props
  addPropsEnabled?: boolean,
  viewType: contentFormViewTypes,
};
