// @flow
import React from 'react';
import { connect } from 'react-redux';
import CustomModal from '../../../../../CustomModal/CustomModal';
import * as styles from './styles';
import SearchForm, { SearchFormItem } from '../../../../../SearchForm/SearchForm';
import type { SearchResultItem } from '../../../../../SearchForm/SearchForm';
import type { ReduxState } from '../../../../../../../redux/store';
import { getMixinsFromRedux } from './state';
import type { MixinModel } from '../../../../../../../data/mixin/model';
import { addMixinToStyleRedux } from '../../../../../../../redux/styles/reducer';

function filterMixins(input: string, items: Array<SearchResultItem>): Array<SearchResultItem> {
  if (!input) return items;
  return items.filter(({ item }) => {
    const mixin: MixinModel = item;
    const mixinName = mixin.name.toLowerCase().replace(' ', '');
    return mixinName.includes(input.toLowerCase().replace(' ', ''));
  });
}

function mapMixinsToItems(
  mixins: Array<MixinModel>,
  handleOnSelect: (key: string) => void
): Array<SearchResultItem> {
  return mixins.map(mixin => ({
    item: mixin,
    component: (
      <SearchFormItem
        label={mixin.name}
        key={mixin.key}
        onClick={() => handleOnSelect(mixin.key)}
      />
    ),
  }));
}

type Props = {
  styleKey: string,
  styleStateKey: string,
  isOpen: boolean,
  onClose: () => void,
  mixins: Array<MixinModel>,
  addMixinToStyle: (mixinKey: string) => void,
};

const AddMixinModal = ({ isOpen, onClose, mixins, addMixinToStyle }: Props) => {
  const handleOnSelect = (key: string) => {
    addMixinToStyle(key);
    onClose();
  };

  const items = mapMixinsToItems(mixins, handleOnSelect);
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.containerClass}>
        <SearchForm filter={filterMixins} items={items} />
      </div>
    </CustomModal>
  );
};

const mapStateToProps = (state: ReduxState) => {
  const mixins = getMixinsFromRedux(state);
  return {
    mixins,
  };
};

const mapDispatchToProps = (dispatch: any, { styleKey, styleStateKey }: Props) => ({
  addMixinToStyle: (mixinKey: string) =>
    dispatch(addMixinToStyleRedux(styleKey, styleStateKey, mixinKey)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMixinModal);
