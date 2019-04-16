// @flow
import React from 'react';
import CustomModal from '../../../../../CustomModal/CustomModal';
import * as styles from './styles';
import SearchForm, { SearchFormItem } from '../../../../../SearchForm/SearchForm';
import type { SearchResultItem } from '../../../../../SearchForm/SearchForm';

function filterMixins(input: string, items: Array<SearchResultItem>): Array<SearchResultItem> {
  return items;
}

function mapMixinsToItems(
  mixins: Array<any>,
  handleOnSelect: (key: string) => void
): Array<SearchResultItem> {
  return mixins.map(mixin => ({
    item: mixin,
    component: <SearchFormItem key="key" onClick={() => handleOnSelect('key')} />,
  }));
}

type Props = {
  isOpen: boolean,
  onClose: () => void,
};

const AddMixinModal = ({ isOpen, onClose }: Props) => {
  const handleOnSelect = (key: string) => {};

  const mixins = mapMixinsToItems([], handleOnSelect);
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.containerClass}>
        <SearchForm filter={filterMixins} items={mixins} />
      </div>
    </CustomModal>
  );
};

export default AddMixinModal;
