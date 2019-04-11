// @flow
import React, { useContext } from 'react';
import { stylesStateFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import TagsList from '../TagsList/TagsList';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';
import type { BlockStylesSelector } from '../EditorComponentFormContextWrapper/context';
import { STYLE_STATES } from '../../../../../data/styles/model';

export function getBlockStylesSelector(
  blockStylesSelector: BlockStylesSelector,
  blockKey: string
): string {
  const selector = blockStylesSelector[blockKey];
  return selector || STYLE_STATES.default;
}

const StylesStateFormSection = () => {
  const { blockKey, blockStylesSelector, setBlockStylesSelector } = useContext(
    EditorComponentFormContext
  );
  const selector = getBlockStylesSelector(blockStylesSelector, blockKey);
  const tags = [
    {
      key: 'default',
      label: 'Default',
      active: selector === STYLE_STATES.default,
      removable: false,
    },
    {
      key: '&:hover',
      label: '&:hover',
      active: selector === '&:hover',
      removable: true,
    },
    {
      key: '&:active',
      label: '&:active',
      active: selector === '&:active',
      removable: true,
    },
  ];

  const handleOnSelect = (key: string) => {
    setBlockStylesSelector(blockKey, key);
  };

  return (
    <FormSection
      heading={stylesStateFormSection.heading}
      columns={stylesStateFormSection.columns}
      visibilityKey={stylesStateFormSection.key}
    >
      <TagsList tags={tags} onSelect={handleOnSelect} />
    </FormSection>
  );
};

export default StylesStateFormSection;
