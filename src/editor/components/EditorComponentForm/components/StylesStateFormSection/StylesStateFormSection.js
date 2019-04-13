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
import { clearStyleStateRedux } from '../../../../../redux/styles/reducer';

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
  clearStyleState: (stateKey: string) => void,
};

const StylesStateFormSection = ({ selectors, clearStyleState }: Props) => {
  const { blockKey, blockStylesSelector, setBlockStylesSelector } = useContext(
    EditorComponentFormContext
  );
  const selector = getBlockStylesSelector(blockStylesSelector, blockKey);

  const tags = mapSelectorsToTags(selectors, selector);

  const handleOnSelect = (key: string) => {
    setBlockStylesSelector(blockKey, key);
  };

  const handleOnRemove = (key: string) => {
    clearStyleState(key);
  };

  return (
    <FormSection
      heading={stylesStateFormSection.heading}
      columns={stylesStateFormSection.columns}
      visibilityKey={stylesStateFormSection.key}
    >
      <TagsList tags={tags} onSelect={handleOnSelect} onRemove={handleOnRemove} />
    </FormSection>
  );
};

const mapStateToProps = (state: ReduxState, { styleKey }: Props) => {
  const selectors = getStateSelectorsFromRedux(state, styleKey);
  return {
    selectors,
  };
};

const mapDispatchToProps = (dispatch: any, { styleKey }: Props) => ({
  clearStyleState: (stateKey: string) => dispatch(clearStyleStateRedux(styleKey, stateKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StylesStateFormSection);
