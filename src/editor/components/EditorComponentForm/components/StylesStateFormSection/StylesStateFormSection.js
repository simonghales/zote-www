// @flow
import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { connect } from 'react-redux';
import { stylesStateFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import TagsList from '../TagsList/TagsList';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';
import type { BlockStylesSelector } from '../EditorComponentFormContextWrapper/context';
import { STYLE_STATES } from '../../../../../data/styles/model';
import type { ReduxState } from '../../../../../redux/store';
import { getStateSelectorsFromRedux } from './state';
import type { StateSelector } from './state';
import type { TagModel } from '../TagsList/TagsList';

export function getBlockStylesSelector(
  blockStylesSelector: BlockStylesSelector,
  blockKey: string
): string {
  const selector = blockStylesSelector[blockKey];
  return selector || STYLE_STATES.default;
}

function mapSelectorsToTags(selectors: Array<StateSelector>, selectorKey: string): Array<TagModel> {
  return selectors.map(selector => ({
    key: selector.key,
    label: selector.label,
    active: selector.key === selectorKey,
    removable: selector.removable,
  }));
}

type Props = {
  styleKey: string,
  selectors: Array<StateSelector>,
};

const StylesStateFormSection = ({ selectors }: Props) => {
  const { blockKey, blockStylesSelector, setBlockStylesSelector } = useContext(
    EditorComponentFormContext
  );
  const selector = getBlockStylesSelector(blockStylesSelector, blockKey);

  const tags = mapSelectorsToTags(selectors, selector);

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

const mapStateToProps = (state: ReduxState, { styleKey }: Props) => {
  const selectors = getStateSelectorsFromRedux(state, styleKey);
  return {
    selectors,
  };
};

export default connect(mapStateToProps)(StylesStateFormSection);
