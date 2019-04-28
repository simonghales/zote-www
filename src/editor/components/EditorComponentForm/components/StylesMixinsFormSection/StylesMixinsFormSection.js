// @flow
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { stylesMixinsFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import TagsList from '../TagsList/TagsList';
import type { ReduxRootState } from '../../../../../redux/store';
import { getStyleMixinsFromRedux } from './state';
import type { StyleMixinTag } from './state';
import type { TagModel } from '../TagsList/TagsList';
import { getBlockStylesSelector } from '../StylesStateFormSection/StylesStateFormSection';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';
import AddMixinModal from './components/AddMixinModal/AddMixinModal';
import { removeMixinFromStyleRedux } from '../../../../../redux/styles/reducer';
import { getReduxPresentState } from '../../../../../redux/styles/state';

type Props = {
  styleKey: string,
  mixins: Array<StyleMixinTag>,
  removeMixinFromStyle: (stateKey: string, mixinKey: string) => void,
};

const filterMixins = (mixins: Array<StyleMixinTag>, stateKey: string): Array<StyleMixinTag> =>
  mixins.filter(mixin => mixin.states.includes(stateKey));

const mapMixinsToTags = (mixins: Array<StyleMixinTag>): Array<TagModel> =>
  mixins.map(mixin => ({
    key: mixin.key,
    label: mixin.label,
    active: true,
    removable: true,
  }));

const StylesMixinsFormSection = ({ mixins, styleKey, removeMixinFromStyle }: Props) => {
  const { blockKey, blockStylesSelector } = useContext(EditorComponentFormContext);
  const selector = getBlockStylesSelector(blockStylesSelector, blockKey);
  const filteredMixins = filterMixins(mixins, selector);
  const tags = mapMixinsToTags(filteredMixins);
  const handleOnSelect = () => {};
  const handleOnRemove = (mixinKey: string) => {
    removeMixinFromStyle(selector, mixinKey);
  };
  const [addingMixin, setAddingMixin] = useState(false);
  const handleAdd = () => {
    setAddingMixin(true);
  };
  return (
    <React.Fragment>
      <FormSection
        heading={stylesMixinsFormSection.heading}
        columns={stylesMixinsFormSection.columns}
        visibilityKey={stylesMixinsFormSection.key}
      >
        <TagsList
          tags={tags}
          onSelect={handleOnSelect}
          onRemove={handleOnRemove}
          onAdd={handleAdd}
        />
      </FormSection>
      <AddMixinModal
        isOpen={addingMixin}
        onClose={() => {
          setAddingMixin(false);
        }}
        addedMixins={filteredMixins}
        styleKey={styleKey}
        styleStateKey={selector}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (rootState: ReduxRootState, { styleKey }: Props) => {
  const state = getReduxPresentState(rootState);
  const mixins = getStyleMixinsFromRedux(state, styleKey);
  return {
    mixins,
  };
};

const mapDispatchToProps = (dispatch: any, { styleKey }: Props) => ({
  removeMixinFromStyle: (stateKey: string, mixinKey: string) =>
    dispatch(removeMixinFromStyleRedux(styleKey, stateKey, mixinKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StylesMixinsFormSection);
