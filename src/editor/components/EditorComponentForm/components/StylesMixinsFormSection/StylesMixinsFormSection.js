// @flow
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { stylesMixinsFormSection } from '../../data/styles';
import FormSection from '../FormSection/FormSection';
import TagsList from '../TagsList/TagsList';
import type { ReduxState } from '../../../../../redux/store';
import { getStyleMixinsFromRedux } from './state';
import type { StyleMixinTag } from './state';
import type { TagModel } from '../TagsList/TagsList';
import { getBlockStylesSelector } from '../StylesStateFormSection/StylesStateFormSection';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';
import AddMixinModal from './components/AddMixinModal/AddMixinModal';

type Props = {
  styleKey: string,
  mixins: Array<StyleMixinTag>,
};

const mapMixinsToTags = (mixins: Array<StyleMixinTag>, stateKey: string): Array<TagModel> =>
  mixins
    .filter(mixin => mixin.states.includes(stateKey))
    .map(mixin => ({
      key: mixin.key,
      label: mixin.label,
      active: true,
      removable: true,
    }));

const StylesMixinsFormSection = ({ mixins }: Props) => {
  const { blockKey, blockStylesSelector } = useContext(EditorComponentFormContext);
  const selector = getBlockStylesSelector(blockStylesSelector, blockKey);
  const tags = mapMixinsToTags(mixins, selector);
  const handleOnSelect = () => {};
  const handleOnRemove = () => {};
  const [addingMixin, setAddingMixin] = useState(true);
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
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: ReduxState, { styleKey }: Props) => {
  const mixins = getStyleMixinsFromRedux(state, styleKey);
  return {
    mixins,
  };
};

export default connect(mapStateToProps)(StylesMixinsFormSection);
